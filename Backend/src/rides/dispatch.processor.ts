import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service.js';

@Processor('dispatch')
export class DispatchProcessor extends WorkerHost {
  constructor(private prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { rideId, pickupLat, pickupLng } = job.data;
    console.log(`[Smart Dispatch] Searching driver for Ride: ${rideId}`);

    // In a real scenario, we use PostGIS ST_Distance to find nearby available drivers.
    // Since we enabled PostGIS, we could do a raw query here.
    
    // Example: Find an ONLINE driver (for simplicity, just taking the first one here)
    const driver = await this.prisma.driver.findFirst({
      where: { status: 'ONLINE' },
    });

    if (driver) {
      console.log(`[Smart Dispatch] Found Driver ${driver.name} for Ride ${rideId}`);
      // Update ride status
      await this.prisma.ride.update({
        where: { id: rideId },
        data: {
          driverId: driver.id,
          status: 'ACCEPTED', // Normally we'd wait for driver's confirmation via WebSockets
        },
      });
    } else {
      console.log(`[Smart Dispatch] No drivers found for Ride ${rideId}`);
      // Re-queue or cancel after timeout
    }
  }
}
