import { Module } from '@nestjs/common';
import { PricingController } from './presentation/pricing.controller';
import { QuoteService } from './application/quote.service';
import { PricingEngine } from './application/pricing-engine';

@Module({
  controllers: [PricingController],
  providers: [QuoteService, PricingEngine],
  exports: [QuoteService],
})
export class PricingModule {}
