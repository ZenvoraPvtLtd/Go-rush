import { Module } from '@nestjs/common';
import { RideController } from './presentation/ride.controller';
import { RideService } from './application/ride.service';
import { PricingModule } from '../pricing/pricing.module';

@Module({
  imports: [PricingModule],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
