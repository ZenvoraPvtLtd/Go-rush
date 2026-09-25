import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

const VALID_TRANSITIONS: Record<string, string[]> = {
  'REQUESTED': ['SEARCHING', 'CANCELLED'],
  'SEARCHING': ['OFFERED', 'CANCELLED', 'NO_DRIVER'],
  'OFFERED': ['ASSIGNED', 'CANCELLED', 'SEARCHING'],
  'ASSIGNED': ['DRIVER_EN_ROUTE', 'CANCELLED'],
  'DRIVER_EN_ROUTE': ['DRIVER_ARRIVED', 'CANCELLED'],
  'DRIVER_ARRIVED': ['STARTED', 'CANCELLED'],
  'STARTED': ['IN_PROGRESS', 'CANCELLED'],
  'IN_PROGRESS': ['COMPLETED', 'DISPUTED'],
};

@Injectable()
export class RideTransitionService {
  constructor(private prisma: PrismaService) {}

  async transitionRide(rideId: string, requestedState: string, actorId: string, metadata?: any) {
    return await this.prisma.$transaction(async (tx) => {
      // Find the ride, taking an explicit row-level lock (FOR UPDATE) 
      // Prisma raw query is the safest way to prevent concurrent state transitions.
      const rides = await tx.$queryRaw<any[]>`SELECT * FROM "Ride" WHERE id = ${rideId} FOR UPDATE`;
      
      if (!rides || rides.length === 0) throw new BadRequestException('Ride not found');
      const ride = rides[0];

      if (!this.isValidTransition(ride.status, requestedState)) {
        throw new BadRequestException(`Invalid transition from ${ride.status} to ${requestedState}`);
      }
      
      const updatedRide = await tx.ride.update({
        where: { id: rideId },
        data: { status: requestedState }
      });

      await tx.rideAudit.create({
        data: {
          rideId: rideId,
          previousState: ride.status,
          newState: requestedState,
          actorId: actorId,
          reason: metadata?.reason || null,
          metadata: metadata || {}
        }
      });

      return { success: true, newState: requestedState, ride: updatedRide };
    });
  }

  private isValidTransition(current: string, target: string): boolean {
    const allowed = VALID_TRANSITIONS[current];
    if (!allowed) return false;
    return allowed.includes(target);
  }
}
