import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PlacesModule } from './modules/places/places.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { RideModule } from './modules/ride/ride.module';

@Module({
  imports: [AuthModule, PlacesModule, PricingModule, RideModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
