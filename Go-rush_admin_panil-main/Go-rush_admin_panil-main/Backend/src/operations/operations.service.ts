import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OperationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const activeVehicles = await this.prisma.vehicle.count({ where: { status: 'ACTIVE' } });
    const vehiclesInMaintenance = await this.prisma.vehicle.count({ where: { status: 'MAINTENANCE' } });
    const totalAssignments = await this.prisma.vehicleAssignment.count({ where: { status: 'ACTIVE' } });

    return {
      activeVehicles,
      vehiclesInMaintenance,
      totalAssignments,
    };
  }

  async getVehicles() {
    return this.prisma.vehicle.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' }
    });
  }

  async assignVehicle(vehicleId: string, driverId: string, adminId: string) {
    // 1. Transaction to prevent concurrent invalid assignments (Business Invariant: One-Driver-One-Vehicle)
    return this.prisma.$transaction(async (tx) => {
      // Check if driver is already assigned to a vehicle
      const existingDriverAssignment = await tx.vehicleAssignment.findFirst({
        where: { driverId, status: 'ACTIVE' },
      });
      if (existingDriverAssignment) {
        throw new BadRequestException('Driver already has an active vehicle assignment.');
      }

      // Check if vehicle is already assigned
      const existingVehicleAssignment = await tx.vehicleAssignment.findFirst({
        where: { vehicleId, status: 'ACTIVE' },
      });
      if (existingVehicleAssignment) {
        throw new BadRequestException('Vehicle is already assigned to a driver.');
      }

      // Ensure Vehicle is ACTIVE
      const vehicle = await tx.vehicle.findUnique({ where: { id: vehicleId } });
      if (!vehicle || vehicle.status !== 'ACTIVE') {
        throw new BadRequestException('Vehicle is not available for assignment.');
      }

      // Create Assignment
      const assignment = await tx.vehicleAssignment.create({
        data: {
          vehicleId,
          driverId,
          status: 'ACTIVE',
        },
      });

      // Audit Log
      await tx.fleetAuditEvent.create({
        data: {
          action: 'VEHICLE_ASSIGNED',
          actorId: adminId,
          targetId: assignment.id,
          metadata: { vehicleId, driverId },
        },
      });

      return assignment;
    });
  }
}
