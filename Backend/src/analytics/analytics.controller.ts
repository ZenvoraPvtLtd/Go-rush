import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('analytics')
@UseGuards(AuthGuard)
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
