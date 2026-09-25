
import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service.js';
import { QuotesController } from './quotes.controller.js';
import { PricingModule } from '../pricing/pricing.module.js';

@Module({
  imports: [PricingModule],
  providers: [QuotesService],
  controllers: [QuotesController],
})
export class QuotesModule {}
