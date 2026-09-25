import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  async getOverview() {
    return this.analyticsService.getOverview();
  }

  @Get('rides')
  async getRideMetrics() {
    return this.analyticsService.getRideMetrics();
  }

  @Get('finance')
  async getFinancialMetrics() {
    return this.analyticsService.getFinancialMetrics();
  }

  @Get('support')
  async getSupportMetrics() {
    return this.analyticsService.getSupportMetrics();
  }
}
