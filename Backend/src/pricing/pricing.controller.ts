
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PricingService } from './pricing.service.js';
import { CalculateFareDto } from './dto/calculate-fare.dto.js';
import { AuthGuard } from '../auth/auth.guard.js'; // Assuming auth guard path

@Controller('pricing')
@UseGuards(AuthGuard)
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post('calculate')
  calculateFare(@Body() body: CalculateFareDto) {
    return this.pricingService.calculateFare(body);
  }
}
