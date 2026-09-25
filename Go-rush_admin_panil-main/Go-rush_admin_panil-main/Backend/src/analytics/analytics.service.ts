import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const totalUsers = await this.prisma.user.count();
    const totalDrivers = await this.prisma.driver.count();
    const totalRides = await this.prisma.ride.count();

    return {
      status: 'DATA_AVAILABLE',
      metrics: {
        totalUsers,
        totalDrivers,
        totalRides,
      }
    };
  }

  async getRideMetrics() {
    const totalRides = await this.prisma.ride.count();
    const completedRides = await this.prisma.ride.count({
      where: { status: 'COMPLETED' },
    });
    const cancelledRides = await this.prisma.ride.count({
      where: { status: 'CANCELLED' },
    });

    const completionRate = totalRides > 0 ? (completedRides / totalRides) * 100 : 0;
    const cancellationRate = totalRides > 0 ? (cancelledRides / totalRides) * 100 : 0;

    return {
      status: 'DATA_AVAILABLE',
      metrics: {
        totalRides,
        completedRides,
        cancelledRides,
        completionRate: parseFloat(completionRate.toFixed(2)),
        cancellationRate: parseFloat(cancellationRate.toFixed(2)),
      }
    };
  }

  async getFinancialMetrics() {
    // Implementing rule: Zero vs Unknown
    // Since Ledger and Settlement tables do not exist, we return DATA_NOT_AVAILABLE.
    return {
      status: 'DATA_NOT_AVAILABLE',
      reason: 'Financial ledger and settlement components are BLOCKED (Not Configured).',
      metrics: null
    };
  }

  async getSupportMetrics() {
    // Implementing rule: Zero vs Unknown
    return {
      status: 'DATA_NOT_AVAILABLE',
      reason: 'Support case module is BLOCKED (Not Configured).',
      metrics: null
    };
  }
}
