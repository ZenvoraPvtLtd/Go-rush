
import { Injectable } from '@nestjs/common';
import { PricingService } from '../pricing/pricing.service.js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QuotesService {
  constructor(private pricingService: PricingService) {}

  generateQuote(input: any) {
    const pricing = this.pricingService.calculateFare(input);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    return {
      quoteId: uuidv4(),
      fare: pricing.fare,
      currency: pricing.currency,
      expiresAt: expiresAt.toISOString(),
    };
  }
}
