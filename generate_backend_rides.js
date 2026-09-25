const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'Backend', 'src');
const ridesDir = path.join(srcDir, 'rides');
const ridesDtoDir = path.join(ridesDir, 'dto');

if (!fs.existsSync(ridesDtoDir)) fs.mkdirSync(ridesDtoDir, { recursive: true });

// 1. Create Ride DTOs
fs.writeFileSync(path.join(ridesDtoDir, 'create-ride.dto.ts'), `
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRideDto {
  @IsString()
  @IsNotEmpty()
  quoteId: string;

  @IsString()
  @IsNotEmpty()
  pickup: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsOptional()
  vehicleType?: string;
}
`);

fs.writeFileSync(path.join(ridesDtoDir, 'cancel-ride.dto.ts'), `
import { IsString, IsOptional } from 'class-validator';

export class CancelRideDto {
  @IsString()
  @IsOptional()
  reason?: string;
}
`);

// 2. Update RidesService
fs.writeFileSync(path.join(ridesDir, 'rides.service.ts'), `
import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto.js';
import { CancelRideDto } from './dto/cancel-ride.dto.js';
import { RideTransitionService } from '../ride/ride-transition.service.js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RidesService {
  constructor(private readonly rideTransitionService: RideTransitionService) {}

  async createRide(createRideDto: CreateRideDto, user: any) {
    if (!createRideDto.quoteId) throw new BadRequestException('Quote ID required');
    
    // Simulate initial state creation logic (DB blocked)
    const rideId = uuidv4();
    const initialState = 'REQUESTED';
    
    // Use transition service to move to SEARCHING
    await this.rideTransitionService.transitionRide(rideId, 'SEARCHING', user, { reason: 'Initial ride creation' });

    return {
      rideId,
      status: 'SEARCHING',
      pickup: createRideDto.pickup,
      destination: createRideDto.destination,
      customer: user
    };
  }

  async getRide(rideId: string, user: any) {
    // DB blocked, returning scaffold
    return { rideId, status: 'SEARCHING', owner: user };
  }

  async getActiveRide(user: any) {
    // DB blocked, returning scaffold
    return { rideId: uuidv4(), status: 'IN_PROGRESS', owner: user };
  }

  async getRideHistory(user: any) {
    // DB blocked, returning scaffold array
    return [];
  }

  async cancelRide(rideId: string, cancelDto: CancelRideDto, user: any) {
    // 1. Verify Ownership (Blocked by DB)
    // 2. Verify State
    // 3. Execute Transition
    await this.rideTransitionService.transitionRide(rideId, 'CANCELLED', user, { reason: cancelDto.reason });
    return { rideId, status: 'CANCELLED' };
  }
}
`);

// 3. Update RidesController
fs.writeFileSync(path.join(ridesDir, 'rides.controller.ts'), `
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
`);

// 4. Update RidesModule
fs.writeFileSync(path.join(ridesDir, 'rides.module.ts'), `
import { Module } from '@nestjs/common';
import { RidesService } from './rides.service.js';
import { RidesController } from './rides.controller.js';
import { RideTransitionService } from '../ride/ride-transition.service.js';

@Module({
  providers: [RidesService, RideTransitionService],
  controllers: [RidesController],
  exports: [RidesService],
})
export class RidesModule {}
`);

// 5. Add Unit Tests for Rides
fs.writeFileSync(path.join(ridesDir, 'rides.service.spec.ts'), `
import { Test, TestingModule } from '@nestjs/testing';
import { RidesService } from './rides.service.js';
import { RideTransitionService } from '../ride/ride-transition.service.js';

describe('RidesService', () => {
  let service: RidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RidesService, RideTransitionService],
    }).compile();

    service = module.get<RidesService>(RidesService);
  });

  it('should create a ride and move to SEARCHING', async () => {
    const result = await service.createRide(
      { quoteId: 'q-123', pickup: 'A', destination: 'B' },
      { id: 'user-1' }
    );
    expect(result.status).toBe('SEARCHING');
  });

  it('should cancel a ride', async () => {
    const result = await service.cancelRide('r-123', { reason: 'User requested' }, { id: 'user-1' });
    expect(result.status).toBe('CANCELLED');
  });
});
`);

console.log("Phase 4E Ride Domain applied: DTOs generated, Service and Controller wired.");
