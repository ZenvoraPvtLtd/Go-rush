import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('operations')
@UseGuards(JwtAuthGuard)
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get('overview')
  async getOverview() {
    return this.operationsService.getOverview();
  }

  @Get('vehicles')
  async getVehicles() {
    return this.operationsService.getVehicles();
  }

  @Post('assignments')
  async assignVehicle(@Body() body: { vehicleId: string; driverId: string; adminId: string }) {
    // Note: adminId should ideally come from the validated JWT token payload.
    return this.operationsService.assignVehicle(body.vehicleId, body.driverId, body.adminId);
  }
}
