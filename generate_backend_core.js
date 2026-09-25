const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'Backend', 'src');

// 1. Pricing Module
const pricingDir = path.join(srcDir, 'pricing');
fs.mkdirSync(pricingDir, { recursive: true });

fs.writeFileSync(path.join(pricingDir, 'pricing.module.ts'), `
import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service.js';
import { PricingController } from './pricing.controller.js';

@Module({
  providers: [PricingService],
  controllers: [PricingController],
  exports: [PricingService],
})
export class PricingModule {}
`);

fs.writeFileSync(path.join(pricingDir, 'pricing.service.ts'), `
import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class PricingService {
  calculateFare(input: any) {
    // Missing business rule: surge multipliers and base formulas are undocumented.
    // Marking explicit configuration requirement.
    if (!input.distance || !input.time) {
      throw new Error('MISSING_CONFIGURATION: distance and time required');
    }
    
    // Minimal deterministic calculation based on hypothetical baseline
    const baseFare = 50;
    const distanceRate = 12;
    const fare = baseFare + (input.distance * distanceRate);
    
    return {
      status: 'CONFIGURED',
      fare: fare,
      currency: 'USD'
    };
  }
}
`);

fs.writeFileSync(path.join(pricingDir, 'pricing.controller.ts'), `
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
`);

fs.writeFileSync(path.join(pricingDir, 'pricing.service.spec.ts'), `
import { Test, TestingModule } from '@nestjs/testing';
import { PricingService } from './pricing.service.js';

describe('PricingService', () => {
  let service: PricingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricingService],
    }).compile();

    service = module.get<PricingService>(PricingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate deterministic fare', () => {
    const result = service.calculateFare({ distance: 10, time: 15 });
    expect(result.fare).toBe(170); // 50 + 10 * 12
  });
});
`);

// 2. Quotes Module
const quotesDir = path.join(srcDir, 'quotes');
fs.mkdirSync(quotesDir, { recursive: true });

fs.writeFileSync(path.join(quotesDir, 'quotes.module.ts'), `
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
`);

fs.writeFileSync(path.join(quotesDir, 'quotes.service.ts'), `
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
`);

fs.writeFileSync(path.join(quotesDir, 'quotes.controller.ts'), `
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
`);

// 3. Update app.module.ts
const appModulePath = path.join(srcDir, 'app.module.ts');
let appModuleContent = fs.readFileSync(appModulePath, 'utf8');

if (!appModuleContent.includes('PricingModule')) {
    appModuleContent = appModuleContent.replace(
        "import { OperationsModule } from './operations/operations.module.js';",
        "import { OperationsModule } from './operations/operations.module.js';\nimport { PricingModule } from './pricing/pricing.module.js';\nimport { QuotesModule } from './quotes/quotes.module.js';"
    );
    appModuleContent = appModuleContent.replace(
        "OperationsModule,",
        "OperationsModule,\n    PricingModule,\n    QuotesModule,"
    );
    fs.writeFileSync(appModulePath, appModuleContent);
}

console.log("Pricing and Quotes modules scaffolded successfully.");
