const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'Backend', 'src');

// 1. Create DTOs for Pricing
const pricingDtoDir = path.join(srcDir, 'pricing', 'dto');
if (!fs.existsSync(pricingDtoDir)) fs.mkdirSync(pricingDtoDir, { recursive: true });

fs.writeFileSync(path.join(pricingDtoDir, 'calculate-fare.dto.ts'), `
import { IsNumber, IsNotEmpty, Min, IsOptional, IsString } from 'class-validator';

export class CalculateFareDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  distance: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  time: number;

  @IsString()
  @IsOptional()
  vehicleType?: string;
}
`);

// Update PricingController to use DTO and AuthGuard
const pricingControllerPath = path.join(srcDir, 'pricing', 'pricing.controller.ts');
fs.writeFileSync(pricingControllerPath, `
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
`);


// 2. Create DTOs for Quotes
const quotesDtoDir = path.join(srcDir, 'quotes', 'dto');
if (!fs.existsSync(quotesDtoDir)) fs.mkdirSync(quotesDtoDir, { recursive: true });

fs.writeFileSync(path.join(quotesDtoDir, 'generate-quote.dto.ts'), `
import { IsNumber, IsNotEmpty, Min, IsString } from 'class-validator';

export class GenerateQuoteDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  distance: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  time: number;

  @IsString()
  @IsNotEmpty()
  vehicleType: string;
}
`);

// Update QuotesController to use DTO and AuthGuard
const quotesControllerPath = path.join(srcDir, 'quotes', 'quotes.controller.ts');
fs.writeFileSync(quotesControllerPath, `
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
`);

// 3. Update main.ts to enable Global ValidationPipe
const mainTsPath = path.join(srcDir, 'main.ts');
let mainTsContent = fs.readFileSync(mainTsPath, 'utf8');

if (!mainTsContent.includes('ValidationPipe')) {
  mainTsContent = mainTsContent.replace(
    "import { NestFactory } from '@nestjs/core';",
    "import { NestFactory } from '@nestjs/core';\nimport { ValidationPipe } from '@nestjs/common';"
  );
  mainTsContent = mainTsContent.replace(
    "await app.listen(process.env.PORT ?? 3000);",
    "app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));\n  await app.listen(process.env.PORT ?? 3000);"
  );
  fs.writeFileSync(mainTsPath, mainTsContent);
}

console.log("Phase 4D Hardening applied: DTOs generated, ValidationPipe wired, AuthGuard wired.");
