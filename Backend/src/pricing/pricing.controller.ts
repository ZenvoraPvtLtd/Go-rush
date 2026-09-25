
import { Controller, Post, Body } from '@nestjs/common';
import { PricingService } from './pricing.service.js';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post('calculate')
  calculateFare(@Body() body: any) {
    return this.pricingService.calculateFare(body);
  }
}
