import { Test, TestingModule } from '@nestjs/testing';
import { RidesService } from './rides.service.js';
import { RideTransitionService } from '../ride/ride-transition.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('RidesService', () => {
  let service: RidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RidesService,
        {
          provide: RideTransitionService,
          useValue: { transitionRide: vi.fn() }
        },
        {
          provide: PrismaService,
          useValue: {
            $transaction: vi.fn(),
            ride: { create: vi.fn(), findUnique: vi.fn() },
            idempotencyRecord: { findUnique: vi.fn(), create: vi.fn() },
            rideAudit: { create: vi.fn() }
          }
        }
      ],
    }).compile();

    service = module.get<RidesService>(RidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
