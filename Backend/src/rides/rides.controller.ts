
import { Controller, Post, Body, UseGuards, Get, Param, Request } from '@nestjs/common';
import { RidesService } from './rides.service.js';
import { CreateRideDto } from './dto/create-ride.dto.js';
import { CancelRideDto } from './dto/cancel-ride.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('rides')
@UseGuards(AuthGuard)
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  createRide(@Body() createRideDto: CreateRideDto, @Request() req: any) {
    const user = req.user || { id: 'mock-user-id', role: 'CUSTOMER' }; // Extract from JWT
    return this.ridesService.createRide(createRideDto, user);
  }

  @Get('active')
  getActiveRide(@Request() req: any) {
    const user = req.user || { id: 'mock-user-id', role: 'CUSTOMER' };
    return this.ridesService.getActiveRide(user);
  }

  @Get('history')
  getRideHistory(@Request() req: any) {
    const user = req.user || { id: 'mock-user-id', role: 'CUSTOMER' };
    return this.ridesService.getRideHistory(user);
  }

  @Get(':id')
  getRide(@Param('id') id: string, @Request() req: any) {
    const user = req.user || { id: 'mock-user-id', role: 'CUSTOMER' };
    return this.ridesService.getRide(id, user);
  }

  @Post(':id/cancel')
  cancelRide(@Param('id') id: string, @Body() cancelDto: CancelRideDto, @Request() req: any) {
    const user = req.user || { id: 'mock-user-id', role: 'CUSTOMER' };
    return this.ridesService.cancelRide(id, cancelDto, user);
  }
}
