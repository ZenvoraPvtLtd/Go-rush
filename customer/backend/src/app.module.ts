import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module.js';
import { PlacesModule } from './modules/places/places.module.js';
import { PricingModule } from './modules/pricing/pricing.module.js';
import { RideModule } from './modules/ride/ride.module.js';
import { AnalyticsModule } from './modules/analytics/analytics.module.js';

@Module({
  imports: [AuthModule, PlacesModule, PricingModule, RideModule, AnalyticsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
