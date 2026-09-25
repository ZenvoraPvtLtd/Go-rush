import { Injectable, BadRequestException, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto.js';
import { CancelRideDto } from './dto/cancel-ride.dto.js';
import { RideTransitionService } from '../ride/ride-transition.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RidesService {
  constructor(
    private readonly rideTransitionService: RideTransitionService,
    private prisma: PrismaService
  ) {}

  async createRide(createRideDto: CreateRideDto, user: any, idempotencyKey?: string) {
    if (!createRideDto.quoteId) throw new BadRequestException('Quote ID required');
    
    // Idempotency check
    if (idempotencyKey) {
      try {
        return await this.prisma.$transaction(async (tx) => {
          // Attempt to create the idempotency record. If it already exists, this will throw.
          const existingRecord = await tx.idempotencyRecord.findUnique({
            where: { key: idempotencyKey }
          });

          if (existingRecord) {
            // Check if request is materially different (simplified check here, can be expanded)
            if (existingRecord.endpoint !== 'createRide') {
              throw new ConflictException('Idempotency key reused for different operation');
            }
            return existingRecord.responseBody; // Return previous result
          }

          // Generate new Ride
          const ride = await tx.ride.create({
            data: {
              riderId: user.id,
              pickupLat: createRideDto.pickup.lat,
              pickupLng: createRideDto.pickup.lng,
              dropoffLat: createRideDto.destination.lat,
              dropoffLng: createRideDto.destination.lng,
              status: 'REQUESTED'
            }
          });

          // Write Audit
          await tx.rideAudit.create({
            data: {
              rideId: ride.id,
              previousState: 'NONE',
              newState: 'REQUESTED',
              actorId: user.id,
              reason: 'Initial ride creation'
            }
          });
          
          const result = {
            rideId: ride.id,
            status: 'REQUESTED',
            pickup: createRideDto.pickup,
            destination: createRideDto.destination,
            customer: user
          };

          // Save Idempotency
          await tx.idempotencyRecord.create({
            data: {
              key: idempotencyKey,
              actorId: user.id,
              endpoint: 'createRide',
              requestBody: createRideDto as any,
              responseBody: result as any,
              responseStatus: 201
            }
          });

          return result;
        });
      } catch (e: any) {
        if (e.code === 'P2002' && e.meta?.target?.includes('key')) {
          // Concurrency: someone else inserted the idempotency key first. Fetch their result.
          const existingRecord = await this.prisma.idempotencyRecord.findUnique({
             where: { key: idempotencyKey }
          });
          if (existingRecord) return existingRecord.responseBody;
        }
        throw e;
      }
    } else {
      // Non-idempotent flow (if client didn't send header, though it should be required for safety)
      const ride = await this.prisma.ride.create({
        data: {
          riderId: user.id,
          pickupLat: createRideDto.pickup.lat,
          pickupLng: createRideDto.pickup.lng,
          dropoffLat: createRideDto.destination.lat,
          dropoffLng: createRideDto.destination.lng,
          status: 'REQUESTED'
        }
      });
      return {
        rideId: ride.id,
        status: 'REQUESTED',
        pickup: createRideDto.pickup,
        destination: createRideDto.destination,
        customer: user
      };
    }
  }

  async getRide(rideId: string, user: any) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) throw new NotFoundException('Ride not found');
    if (ride.riderId !== user.id && ride.driverId !== user.id) {
      throw new ForbiddenException('You do not have access to this ride');
    }
    return ride;
  }

  async getActiveRide(user: any) {
    const ride = await this.prisma.ride.findFirst({
      where: {
        OR: [{ riderId: user.id }, { driverId: user.id }],
        status: { in: ['REQUESTED', 'SEARCHING', 'OFFERED', 'ASSIGNED', 'DRIVER_EN_ROUTE', 'DRIVER_ARRIVED', 'STARTED', 'IN_PROGRESS'] }
      }
    });
    if (!ride) throw new NotFoundException('No active ride');
    return ride;
  }

  async getRideHistory(user: any) {
    return await this.prisma.ride.findMany({
      where: {
        OR: [{ riderId: user.id }, { driverId: user.id }]
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async cancelRide(rideId: string, cancelDto: CancelRideDto, user: any) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) throw new NotFoundException('Ride not found');
    
    // Verify Ownership
    if (ride.riderId !== user.id && ride.driverId !== user.id) {
      throw new ForbiddenException('Cannot cancel someone else\'s ride');
    }
    
    // Execute Transition
    const res = await this.rideTransitionService.transitionRide(rideId, 'CANCELLED', user.id, { reason: cancelDto.reason });
    return res;
  }
  
  // DRIVER CONCURRENCY RACE TEST HELPER
  async assignDriver(rideId: string, driverId: string) {
    return await this.prisma.$transaction(async (tx) => {
      // Must take explicit lock!
      const rides = await tx.$queryRaw<any[]>`SELECT * FROM "Ride" WHERE id = ${rideId} FOR UPDATE`;
      if (!rides || rides.length === 0) throw new NotFoundException('Ride not found');
      
      const ride = rides[0];
      if (ride.status !== 'OFFERED' && ride.status !== 'SEARCHING') {
        throw new ConflictException(`Ride cannot be assigned from state ${ride.status}`);
      }

      if (ride.driverId) {
        throw new ConflictException('Ride already assigned');
      }

      const updatedRide = await tx.ride.update({
        where: { id: rideId },
        data: { 
          driverId: driverId,
          status: 'ASSIGNED'
        }
      });
      
      await tx.rideAudit.create({
        data: {
          rideId: ride.id,
          previousState: ride.status,
          newState: 'ASSIGNED',
          actorId: driverId,
          reason: 'Driver claimed ride'
        }
      });
      
      return updatedRide;
    });
  }
}
