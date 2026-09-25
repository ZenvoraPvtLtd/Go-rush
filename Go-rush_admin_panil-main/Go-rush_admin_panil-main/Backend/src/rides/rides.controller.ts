import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { RidesService } from './rides.service.js';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('request')
  async requestRide(@Body() body: any) {
    const { riderId, pickupLat, pickupLng, dropoffLat, dropoffLng } = body;
    return this.ridesService.requestRide(riderId, pickupLat, pickupLng, dropoffLat, dropoffLng);
  }

  @Get(':id')
  async getRide(@Param('id') id: string) {
    return this.ridesService.getRideDetails(id);
  }

  @Patch(':id/complete')
  async completeRide(@Param('id') id: string) {
    return this.ridesService.completeRide(id);
  }

  @Patch(':id/cancel')
  async cancelRide(@Param('id') id: string, @Body('reason') reason: string) {
    return this.ridesService.cancelRide(id, reason);
  }
}

