import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalUsers = await this.prisma.user.count();
    const totalDrivers = await this.prisma.driver.count();
    const activeRides = await this.prisma.ride.count({
      where: { status: 'IN_PROGRESS' },
    });
    const completedRides = await this.prisma.ride.findMany({
      where: { status: 'COMPLETED' },
      select: { fare: true },
    });
    
    const totalRevenue = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);

    return {
      totalUsers,
      totalDrivers,
      activeRides,
      totalRevenue,
    };
  }

  async getAllDrivers() {
    return this.prisma.driver.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateDriverStatus(id: string, status: string) {
    return this.prisma.driver.update({
      where: { id },
      data: { status },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllRides() {
    return this.prisma.ride.findMany({
      include: {
        rider: true,
        driver: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
