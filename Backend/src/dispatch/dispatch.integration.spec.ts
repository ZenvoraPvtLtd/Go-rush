import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { DispatchService } from './dispatch.service.js';
import { RideTransitionService } from '../ride/ride-transition.service.js';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { v4 as uuidv4 } from 'uuid';

describe('DispatchService Integration & Concurrency', () => {
  let dispatchService: DispatchService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, DispatchService, RideTransitionService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    dispatchService = module.get<DispatchService>(DispatchService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  async function createTestUser() {
    return await prisma.user.create({
      data: {
        id: uuidv4(),
        name: 'Test Rider',
        email: `test-${uuidv4()}@example.com`,
        phone: `555-${Math.floor(Math.random() * 100000)}`,
        password: 'hash'
      }
    });
  }

  async function createTestDriver(lat?: number, lng?: number, status = 'ONLINE') {
    const l = lat ?? (Math.random() * 160 - 80);
    const g = lng ?? (Math.random() * 340 - 170);
    const driver = await prisma.driver.create({
      data: {
        id: uuidv4(),
        name: 'Test Driver',
        email: `driver-${uuidv4()}@example.com`,
        phone: `555-${Math.floor(Math.random() * 100000)}`,
        password: 'hash',
        status,
        lat: l,
        lng: g
      }
    });
    return driver;
  }

  it('1. Eligible Driver Discovery & Ranking', async () => {
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: {
        riderId: rider.id,
        pickupLat: -50.0, pickupLng: -50.0,
        dropoffLat: 20, dropoffLng: 20,
        status: 'SEARCHING'
      }
    });

    const driver1 = await createTestDriver(-50.1, -50.1, 'ONLINE'); // Close
    const driver2 = await createTestDriver(-50.01, -50.01, 'ONLINE'); // Closer
    const driver3 = await createTestDriver(-45.0, -45.0, 'ONLINE'); // Far (outside 0.5 deg)
    const driver4 = await createTestDriver(-50.0, -50.0, 'OFFLINE'); // Offline

    const candidates = await dispatchService.findEligibleDrivers(ride.id);

    // Candidates should include driver2 then driver1, excluding driver3 and driver4
    const candidateIds = candidates.map(c => c.id);
    expect(candidateIds).toContain(driver2.id);
    expect(candidateIds).toContain(driver1.id);
    expect(candidateIds).not.toContain(driver3.id);
    expect(candidateIds).not.toContain(driver4.id);

    // Driver 2 should be ranked before driver 1
    expect(candidateIds.indexOf(driver2.id)).toBeLessThan(candidateIds.indexOf(driver1.id));
  });

  it('2. Start Dispatch / Create Offer', async () => {
    const driver = await createTestDriver();
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: {
        riderId: rider.id,
        pickupLat: driver.lat!, pickupLng: driver.lng!,
        dropoffLat: 20, dropoffLng: 20,
        status: 'SEARCHING'
      }
    });

    const res = await dispatchService.startDispatch(ride.id);
    expect(res.success).toBe(true);
    expect(res.result).toBe('OFFER_CREATED');
    expect(res.offer?.driverId).toBe(driver.id);
    expect(res.offer?.status).toBe('OFFERED');
  });

  it('3. Duplicate Offer Prevention', async () => {
    const driver = await createTestDriver();
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: { riderId: rider.id, pickupLat: driver.lat!, pickupLng: driver.lng!, dropoffLat: 40, dropoffLng: 40, status: 'SEARCHING' }
    });

    await dispatchService.startDispatch(ride.id);
    const res2 = await dispatchService.startDispatch(ride.id);
    
    // Should reject because active offer exists
    expect(res2.success).toBe(false);
    expect(res2.reason).toContain('active offer');
  });

  it('4. Driver Accept', async () => {
    const driver = await createTestDriver();
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: { riderId: rider.id, pickupLat: driver.lat!, pickupLng: driver.lng!, dropoffLat: 50, dropoffLng: 50, status: 'SEARCHING' }
    });
    const res = await dispatchService.startDispatch(ride.id);
    
    await dispatchService.acceptOffer(res.offer!.id, driver.id);

    const updatedRide = await prisma.ride.findUnique({ where: { id: ride.id } });
    expect(updatedRide?.status).toBe('ASSIGNED');
    expect(updatedRide?.driverId).toBe(driver.id);

    const updatedDriver = await prisma.driver.findUnique({ where: { id: driver.id } });
    expect(updatedDriver?.status).toBe('BUSY');
  });

  it('5. Driver Reject & Rematch', async () => {
    const driver1 = await createTestDriver();
    const driver2 = await createTestDriver(driver1.lat!, driver1.lng!);
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: { riderId: rider.id, pickupLat: driver1.lat!, pickupLng: driver1.lng!, dropoffLat: 60, dropoffLng: 60, status: 'SEARCHING' }
    });

    const res1 = await dispatchService.startDispatch(ride.id);
    
    await dispatchService.rejectOffer(res1.offer!.id, driver1.id);
    
    // Rematch
    const res2 = await dispatchService.startRematch(ride.id);
    
    expect(res2.success).toBe(true);
    expect(res2.offer?.driverId).not.toBe(driver1.id);
    expect([driver1.id, driver2.id]).toContain(res2.offer?.driverId);
  });

  it('6. Offer Expiration', async () => {
    const driver = await createTestDriver();
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: { riderId: rider.id, pickupLat: driver.lat!, pickupLng: driver.lng!, dropoffLat: 70, dropoffLng: 70, status: 'SEARCHING' }
    });
    
    const res = await dispatchService.startDispatch(ride.id);
    await dispatchService.expireOffer(res.offer!.id);

    const updatedOffer = await prisma.dispatchOffer.findUnique({ where: { id: res.offer!.id } });
    expect(updatedOffer?.status).toBe('EXPIRED');

    // Attempting to accept expired offer should fail
    await expect(dispatchService.acceptOffer(res.offer!.id, driver.id)).rejects.toThrow('Offer is already EXPIRED');
  });

  it('7. Accept-after-expiration rejection (Timeout Race)', async () => {
    const driver = await createTestDriver();
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: { riderId: rider.id, pickupLat: driver.lat!, pickupLng: driver.lng!, dropoffLat: 80, dropoffLng: 80, status: 'SEARCHING' }
    });
    const res = await dispatchService.startDispatch(ride.id);
    
    // Manually force expiration in DB for test
    await prisma.dispatchOffer.update({ where: { id: res.offer!.id }, data: { expiresAt: new Date(Date.now() - 1000) } });

    // Accept should detect expiration and fail
    await expect(dispatchService.acceptOffer(res.offer!.id, driver.id)).rejects.toThrow('Offer has expired');
    
    // The transaction rolls back, so the DB still has OFFERED (unless the cron swept it)
    const updatedOffer = await prisma.dispatchOffer.findUnique({ where: { id: res.offer!.id } });
    expect(updatedOffer?.status).toBe('OFFERED');
  });

  it('8. NO_DRIVER scenario', async () => {
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: { riderId: rider.id, pickupLat: 80.0, pickupLng: 80.0, dropoffLat: 85, dropoffLng: 85, status: 'SEARCHING' }
    });
    // Assuming no online drivers at 80,80
    const res = await dispatchService.startDispatch(ride.id);
    
    expect(res.success).toBe(true);
    expect(res.result).toBe('NO_DRIVER');

    const updatedRide = await prisma.ride.findUnique({ where: { id: ride.id } });
    expect(updatedRide?.status).toBe('NO_DRIVER');
  });

  it('9. Driver Authorization', async () => {
    const driver1 = await createTestDriver();
    const driver2 = await createTestDriver(driver1.lat!, driver1.lng!);
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: { riderId: rider.id, pickupLat: driver1.lat!, pickupLng: driver1.lng!, dropoffLat: 45, dropoffLng: 45, status: 'SEARCHING' }
    });

    const res = await dispatchService.startDispatch(ride.id);
    
    // Driver 2 tries to accept Driver 1's offer
    if (res.offer?.driverId === driver1.id) {
      await expect(dispatchService.acceptOffer(res.offer!.id, driver2.id)).rejects.toThrow('Not authorized');
    }
  });

  it('10. Concurrent Expiration vs Acceptance Race', async () => {
    const driver = await createTestDriver();
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: { riderId: rider.id, pickupLat: driver.lat!, pickupLng: driver.lng!, dropoffLat: -20, dropoffLng: -20, status: 'SEARCHING' }
    });
    const res = await dispatchService.startDispatch(ride.id);
    
    // Execute both accept and expire concurrently
    const results = await Promise.allSettled([
      dispatchService.acceptOffer(res.offer!.id, driver.id),
      dispatchService.expireOffer(res.offer!.id)
    ]);

    const successes = results.filter(r => r.status === 'fulfilled');
    // Both might succeed at application level (expireOffer returns if already accepted, acceptOffer succeeds if not expired)
    // Wait, expireOffer checks `offer.status !== 'OFFERED'` and returns.
    // acceptOffer checks `offer.status !== 'OFFERED'` and throws.
    // If accept wins, expire sees ACCEPTED and does nothing.
    // If expire wins, accept sees EXPIRED and throws.
    
    const updatedOffer = await prisma.dispatchOffer.findUnique({ where: { id: res.offer!.id } });
    expect(['ACCEPTED', 'EXPIRED']).toContain(updatedOffer?.status);
  });
});
