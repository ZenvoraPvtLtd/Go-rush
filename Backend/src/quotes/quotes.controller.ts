
import { Controller, Post, Body } from '@nestjs/common';
import { QuotesService } from './quotes.service.js';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post('generate')
  generateQuote(@Body() body: any) {
    return this.quotesService.generateQuote(body);
  }
}
