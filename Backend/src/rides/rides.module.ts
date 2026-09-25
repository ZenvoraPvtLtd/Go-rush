
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
