
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service.js';
import { GenerateQuoteDto } from './dto/generate-quote.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('quotes')
@UseGuards(AuthGuard)
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post('generate')
  generateQuote(@Body() body: GenerateQuoteDto) {
    return this.quotesService.generateQuote(body);
  }
}
