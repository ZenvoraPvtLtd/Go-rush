import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class RidesService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('dispatch') private dispatchQueue: Queue
  ) {}

  async requestRide(riderId: string, pickupLat: number, pickupLng: number, dropoffLat: number, dropoffLng: number) {
    // 1. Create a ride in database
    const ride = await this.prisma.ride.create({
      data: {
        riderId,
        pickupLat,
        pickupLng,
        dropoffLat,
        dropoffLng,
        status: 'SEARCHING',
      },
    });

    // 2. Add job to the dispatch queue to find a driver
    await this.dispatchQueue.add('find_driver', {
      rideId: ride.id,
      pickupLat,
      pickupLng,
    });

    return ride;
  }

  async getRideDetails(id: string) {
    return this.prisma.ride.findUnique({
      where: { id },
      include: { rider: true, driver: true },
    });
  }

  async completeRide(id: string) {
    // Basic mock fare calculation based on a random number (in production, use distance * rate)
    const fare = Math.floor(Math.random() * 500) + 100; 
    
    return this.prisma.ride.update({
      where: { id },
      data: { status: 'COMPLETED', fare },
    });
  }

  async cancelRide(id: string, reason: string) {
    return this.prisma.ride.update({
      where: { id },
      data: { status: 'CANCELLED', cancellationReason: reason },
    });
  }
}
