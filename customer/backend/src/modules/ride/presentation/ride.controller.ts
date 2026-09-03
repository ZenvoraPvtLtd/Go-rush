import { Controller, Post, Get, Param, Body, Headers, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { RideService } from '../application/ride.service';

@Controller('v1/rides')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  private extractCustomer(authHeader: string): string {
    const customerId = authHeader ? 'cust_123' : null;
    if (!customerId) throw new UnauthorizedException();
    return customerId;
  }

  @Post()
  async createRide(
    @Headers('Authorization') authHeader: string,
    @Headers('Idempotency-Key') idempotencyKey: string,
    @Body('quoteId') quoteId: string,
  ) {
    if (!idempotencyKey) {
      throw new BadRequestException({ code: 'RIDE_MISSING_IDEMPOTENCY', message: 'Idempotency-Key header is required' });
    }
    const customerId = this.extractCustomer(authHeader);
    return this.rideService.createRide(customerId, quoteId, idempotencyKey);
  }

  @Get('active')
  async getActiveRide(@Headers('Authorization') authHeader: string) {
    const customerId = this.extractCustomer(authHeader);
    return this.rideService.getActiveRide(customerId);
  }

  @Get(':id')
  async getRide(
    @Headers('Authorization') authHeader: string,
    @Param('id') id: string
  ) {
    const customerId = this.extractCustomer(authHeader);
    return this.rideService.getRide(id, customerId);
  }

  @Post(':rideId/cancel')
  async cancelRide(
    @Headers('Authorization') authHeader: string,
    @Param('rideId') rideId: string,
    @Body('reason') reason: string,
  ) {
    const customerId = this.extractCustomer(authHeader);
    return this.rideService.cancelRide(rideId, customerId, reason);
  }

  @Get(':rideId/realtime-state')
  async getRealtimeState(
    @Headers('Authorization') authHeader: string,
    @Param('rideId') rideId: string,
  ) {
    const customerId = this.extractCustomer(authHeader);
    const ride = await this.rideService.getActiveRide(customerId);
    
    if (!ride || ride.rideId !== rideId) {
      throw new UnauthorizedException('Ride not found or not owned by user');
    }
    
    // This provides the Fallback REST reconciliation
    return {
      rideId: ride.rideId,
      status: ride.status,
      // In prod: latestLocation: await this.redisLocationStore.getLocation(rideId)
      latestLocation: null, 
    };
  }
}
