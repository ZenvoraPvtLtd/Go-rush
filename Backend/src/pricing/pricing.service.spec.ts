
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
