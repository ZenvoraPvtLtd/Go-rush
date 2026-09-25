
import { Test, TestingModule } from '@nestjs/testing';
import { RidesService } from './rides.service.js';
import { RideTransitionService } from '../ride/ride-transition.service.js';

describe('RidesService', () => {
  let service: RidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RidesService, RideTransitionService],
    }).compile();

    service = module.get<RidesService>(RidesService);
  });

  it('should create a ride and move to SEARCHING', async () => {
    const result = await service.createRide(
      { quoteId: 'q-123', pickup: 'A', destination: 'B' },
      { id: 'user-1' }
    );
    expect(result.status).toBe('SEARCHING');
  });

  it('should cancel a ride', async () => {
    const result = await service.cancelRide('r-123', { reason: 'User requested' }, { id: 'user-1' });
    expect(result.status).toBe('CANCELLED');
  });
});
