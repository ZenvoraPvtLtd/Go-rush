import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { RidesService } from './rides.service.js';
import { RideTransitionService } from '../ride/ride-transition.service.js';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { v4 as uuidv4 } from 'uuid';

describe('RidesService Integration & Concurrency Certification', () => {
  let ridesService: RidesService;
  let rideTransitionService: RideTransitionService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, RidesService, RideTransitionService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    ridesService = module.get<RidesService>(RidesService);
    rideTransitionService = module.get<RideTransitionService>(RideTransitionService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Helper to create test user
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

  // Helper to create test driver
  async function createTestDriver() {
    return await prisma.driver.create({
      data: {
        id: uuidv4(),
        name: 'Test Driver',
        email: `driver-${uuidv4()}@example.com`,
        phone: `555-${Math.floor(Math.random() * 100000)}`,
        password: 'hash',
        status: 'ONLINE'
      }
    });
  }

  it('1. Concurrency Test - Driver Claim Race', async () => {
    const rider = await createTestUser();
    const driver1 = await createTestDriver();
    const driver2 = await createTestDriver();

    const ride = await prisma.ride.create({
      data: {
        riderId: rider.id,
        pickupLat: 10, pickupLng: 10, dropoffLat: 20, dropoffLng: 20,
        status: 'OFFERED'
      }
    });

    // Both drivers try to claim the ride concurrently
    const results = await Promise.allSettled([
      ridesService.assignDriver(ride.id, driver1.id),
      ridesService.assignDriver(ride.id, driver2.id)
    ]);

    const successes = results.filter(r => r.status === 'fulfilled');
    const failures = results.filter(r => r.status === 'rejected');

    expect(successes.length).toBe(1);
    expect(failures.length).toBe(1);

    const updatedRide = await prisma.ride.findUnique({ where: { id: ride.id } });
    expect(updatedRide?.status).toBe('ASSIGNED');
    expect(updatedRide?.driverId).toBeTruthy();

    const audits = await prisma.rideAudit.findMany({ where: { rideId: ride.id } });
    expect(audits.length).toBe(1);
    expect(audits[0].newState).toBe('ASSIGNED');
  });

  it('2. Concurrent State Transition Test', async () => {
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: {
        riderId: rider.id,
        pickupLat: 10, pickupLng: 10, dropoffLat: 20, dropoffLng: 20,
        status: 'REQUESTED'
      }
    });

    const results = await Promise.allSettled([
      rideTransitionService.transitionRide(ride.id, 'SEARCHING', rider.id),
      rideTransitionService.transitionRide(ride.id, 'SEARCHING', rider.id)
    ]);

    const successes = results.filter(r => r.status === 'fulfilled');
    const failures = results.filter(r => r.status === 'rejected');

    expect(successes.length).toBe(1);
    expect(failures.length).toBe(1);

    const updatedRide = await prisma.ride.findUnique({ where: { id: ride.id } });
    expect(updatedRide?.status).toBe('SEARCHING');

    const audits = await prisma.rideAudit.findMany({ where: { rideId: ride.id } });
    expect(audits.length).toBe(1);
  });

  it('3. Invalid Transition Test', async () => {
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: {
        riderId: rider.id,
        pickupLat: 10, pickupLng: 10, dropoffLat: 20, dropoffLng: 20,
        status: 'COMPLETED'
      }
    });

    await expect(rideTransitionService.transitionRide(ride.id, 'STARTED', rider.id))
      .rejects.toThrow('Invalid transition');

    const updatedRide = await prisma.ride.findUnique({ where: { id: ride.id } });
    expect(updatedRide?.status).toBe('COMPLETED');
  });

  it('4. Idempotency Test - Concurrent Ride Creation', async () => {
    const rider = await createTestUser();
    const idempotencyKey = `create-ride-${uuidv4()}`;
    
    const dto = {
      quoteId: 'quote-123',
      pickup: { lat: 10, lng: 10 },
      destination: { lat: 20, lng: 20 }
    };

    const results = await Promise.allSettled([
      ridesService.createRide(dto, rider, idempotencyKey),
      ridesService.createRide(dto, rider, idempotencyKey)
    ]);

    const successes = results.filter(r => r.status === 'fulfilled');
    expect(successes.length).toBe(2);

    // Both should return the same result/rideId
    const val1 = (results[0] as any).value;
    const val2 = (results[1] as any).value;
    expect(val1.rideId).toBe(val2.rideId);

    const rides = await prisma.ride.findMany({ where: { riderId: rider.id } });
    expect(rides.length).toBe(1); // Only 1 ride created
  });

  it('5. Rollback Certification', async () => {
    // If we throw an error during a transaction, it should rollback.
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: {
        riderId: rider.id,
        pickupLat: 10, pickupLng: 10, dropoffLat: 20, dropoffLng: 20,
        status: 'REQUESTED'
      }
    });

    try {
      await prisma.$transaction(async (tx) => {
        await tx.ride.update({ where: { id: ride.id }, data: { status: 'SEARCHING' } });
        await tx.rideAudit.create({
          data: {
            rideId: ride.id,
            previousState: 'REQUESTED',
            newState: 'SEARCHING',
            actorId: rider.id,
          }
        });
        throw new Error('Controlled Failure');
      });
    } catch (e) {
      expect((e as Error).message).toBe('Controlled Failure');
    }

    const updatedRide = await prisma.ride.findUnique({ where: { id: ride.id } });
    expect(updatedRide?.status).toBe('REQUESTED'); // Rolled back

    const audits = await prisma.rideAudit.findMany({ where: { rideId: ride.id } });
    expect(audits.length).toBe(0); // Rolled back
  });

  it('6. IDOR Testing - Cannot fetch another user ride', async () => {
    const rider1 = await createTestUser();
    const rider2 = await createTestUser();

    const ride1 = await prisma.ride.create({
      data: {
        riderId: rider1.id,
        pickupLat: 10, pickupLng: 10, dropoffLat: 20, dropoffLng: 20,
        status: 'REQUESTED'
      }
    });

    await expect(ridesService.getRide(ride1.id, rider2)).rejects.toThrow('You do not have access to this ride');
  });

  it('7. Audit / History Certification', async () => {
    const rider = await createTestUser();
    const ride = await prisma.ride.create({
      data: {
        riderId: rider.id,
        pickupLat: 10, pickupLng: 10, dropoffLat: 20, dropoffLng: 20,
        status: 'REQUESTED'
      }
    });

    await rideTransitionService.transitionRide(ride.id, 'SEARCHING', rider.id, { reason: 'User requested' });

    const audits = await prisma.rideAudit.findMany({ where: { rideId: ride.id } });
    expect(audits.length).toBe(1);
    expect(audits[0].previousState).toBe('REQUESTED');
    expect(audits[0].newState).toBe('SEARCHING');
    expect(audits[0].actorId).toBe(rider.id);
    expect(audits[0].reason).toBe('User requested');
  });

});
