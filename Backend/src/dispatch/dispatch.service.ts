import { Injectable, NotFoundException, ConflictException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RideTransitionService } from '../ride/ride-transition.service.js';

@Injectable()
export class DispatchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rideTransitionService: RideTransitionService,
  ) {}

  // 1. Candidate Search & Ranking
  async findEligibleDrivers(rideId: string) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) throw new NotFoundException('Ride not found');

    // Get drivers who have already been offered this ride
    const existingOffers = await this.prisma.dispatchOffer.findMany({
      where: { rideId: ride.id },
      select: { driverId: true }
    });
    const excludedDriverIds = existingOffers.map(o => o.driverId);

    // Find eligible drivers (ONLINE, not excluded)
    // In production with PostGIS, we would use ST_DWithin and ST_Distance.
    // For now, we use a basic bounding box approximation (1 deg ~ 111km)
    // Documenting assumption: Without PostGIS, proximity is approximated in SQL.
    const searchRadiusDeg = 0.5; // ~55km

    const candidates = await this.prisma.driver.findMany({
      where: {
        status: 'ONLINE',
        id: { notIn: excludedDriverIds },
        lat: { gte: ride.pickupLat - searchRadiusDeg, lte: ride.pickupLat + searchRadiusDeg },
        lng: { gte: ride.pickupLng - searchRadiusDeg, lte: ride.pickupLng + searchRadiusDeg }
      },
      // Note: without PostGIS, sorting by exact distance requires fetching to memory or raw SQL.
      // We will fetch up to 20 candidates and sort in memory for this baseline.
      take: 20
    });

    // Rank candidates by Euclidean distance (approximation)
    candidates.sort((a, b) => {
      if (a.lat == null || a.lng == null || b.lat == null || b.lng == null) return 0;
      const distA = Math.pow(a.lat - ride.pickupLat, 2) + Math.pow(a.lng - ride.pickupLng, 2);
      const distB = Math.pow(b.lat - ride.pickupLat, 2) + Math.pow(b.lng - ride.pickupLng, 2);
      return distA - distB;
    });

    return candidates;
  }

  // 2. Start Dispatch / Rematch
  async startDispatch(rideId: string) {
    // We must ensure the ride is in SEARCHING state
    const rides = await this.prisma.$queryRaw<any[]>`SELECT * FROM "Ride" WHERE id = ${rideId} FOR UPDATE`;
    if (!rides || rides.length === 0) throw new NotFoundException('Ride not found');
    const ride = rides[0];

    if (ride.status !== 'SEARCHING') {
      return { success: false, reason: `Ride is in ${ride.status} state, cannot dispatch.` };
    }

    // Check if there is an active offer already
    const activeOffer = await this.prisma.dispatchOffer.findFirst({
      where: { rideId, status: 'OFFERED' }
    });
    if (activeOffer) {
      return { success: false, reason: 'Ride already has an active offer.' };
    }

    const candidates = await this.findEligibleDrivers(ride.id);

    if (candidates.length === 0) {
      // Exhausted all candidates -> NO_DRIVER
      await this.rideTransitionService.transitionRide(ride.id, 'NO_DRIVER', 'SYSTEM', { reason: 'No eligible drivers found' });
      // TODO: Publish ride.rematch.completed
      return { success: true, result: 'NO_DRIVER' };
    }

    const bestDriver = candidates[0];

    // Create Offer
    const expiresAt = new Date(Date.now() + 30000); // 30s expiration
    
    // Determine attempt number
    const pastOffers = await this.prisma.dispatchOffer.count({ where: { rideId: ride.id } });
    
    const offer = await this.prisma.dispatchOffer.create({
      data: {
        rideId: ride.id,
        driverId: bestDriver.id,
        status: 'OFFERED',
        attemptNumber: pastOffers + 1,
        expiresAt
      }
    });

    // TODO: Publish ride.offer.created via WS
    // TODO: Schedule Expiration via Redis/BullMQ 
    // Documenting assumption: BullMQ is not fully wired yet, but the domain is ready for it.

    return { success: true, result: 'OFFER_CREATED', offer };
  }

  // 3. Driver Accept
  async acceptOffer(offerId: string, driverId: string) {
    return await this.prisma.$transaction(async (tx) => {
      // Lock the offer
      const offers = await tx.$queryRaw<any[]>`SELECT * FROM "DispatchOffer" WHERE id = ${offerId} FOR UPDATE`;
      if (!offers || offers.length === 0) throw new NotFoundException('Offer not found');
      const offer = offers[0];

      if (offer.driverId !== driverId) throw new ForbiddenException('Not authorized for this offer');
      if (offer.status !== 'OFFERED') throw new ConflictException(`Offer is already ${offer.status}`);
      if (new Date() > offer.expiresAt) {
        // Technically it expired, we handle it gracefully
        await tx.dispatchOffer.update({ where: { id: offerId }, data: { status: 'EXPIRED' } });
        throw new ConflictException('Offer has expired');
      }

      // Lock the ride
      const rides = await tx.$queryRaw<any[]>`SELECT * FROM "Ride" WHERE id = ${offer.rideId} FOR UPDATE`;
      const ride = rides[0];
      if (ride.status !== 'SEARCHING') {
        throw new ConflictException(`Ride cannot be accepted from state ${ride.status}`);
      }

      // Atomically mark offer accepted
      const updatedOffer = await tx.dispatchOffer.update({
        where: { id: offerId },
        data: { status: 'ACCEPTED', respondedAt: new Date() }
      });

      // Update Ride
      await tx.ride.update({
        where: { id: ride.id },
        data: { 
          driverId: driverId,
          status: 'ASSIGNED'
        }
      });
      
      await tx.rideAudit.create({
        data: {
          rideId: ride.id,
          previousState: 'SEARCHING',
          newState: 'ASSIGNED',
          actorId: driverId,
          reason: 'Driver accepted offer'
        }
      });

      // Update Driver status
      await tx.driver.update({
        where: { id: driverId },
        data: { status: 'BUSY' }
      });

      // TODO: Publish ride.assigned
      return updatedOffer;
    });
  }

  // 4. Driver Reject
  async rejectOffer(offerId: string, driverId: string, reason?: string) {
    return await this.prisma.$transaction(async (tx) => {
      const offers = await tx.$queryRaw<any[]>`SELECT * FROM "DispatchOffer" WHERE id = ${offerId} FOR UPDATE`;
      if (!offers || offers.length === 0) throw new NotFoundException('Offer not found');
      const offer = offers[0];

      if (offer.driverId !== driverId) throw new ForbiddenException('Not authorized for this offer');
      if (offer.status !== 'OFFERED') throw new ConflictException(`Offer is already ${offer.status}`);

      const updatedOffer = await tx.dispatchOffer.update({
        where: { id: offerId },
        data: { 
          status: 'REJECTED', 
          respondedAt: new Date(),
          rejectionReason: reason || 'DRIVER_REJECTED'
        }
      });

      return updatedOffer;
    });
  }

  // 5. Expire Offer
  async expireOffer(offerId: string) {
    return await this.prisma.$transaction(async (tx) => {
      const offers = await tx.$queryRaw<any[]>`SELECT * FROM "DispatchOffer" WHERE id = ${offerId} FOR UPDATE`;
      if (!offers || offers.length === 0) throw new NotFoundException('Offer not found');
      const offer = offers[0];

      if (offer.status !== 'OFFERED') return offer; // Already processed

      const updatedOffer = await tx.dispatchOffer.update({
        where: { id: offerId },
        data: { status: 'EXPIRED' }
      });
      
      return updatedOffer;
    });
  }

  // 6. Rematch Engine
  async startRematch(rideId: string) {
    // startDispatch already filters out existing/rejected offers.
    // Therefore, startDispatch natively behaves as a rematch engine.
    return await this.startDispatch(rideId);
  }
}
