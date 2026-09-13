import { Ride } from '../../ride/domain/ride.js';
import { RideService } from '../../ride/application/ride.service.js';
import { DriverEligibilityPolicy } from './driver-eligibility.policy.js';
import { DriverRankingPolicy } from './driver-ranking.policy.js';
import { MockDriverLocationProvider } from '../infrastructure/mock-driver-location.provider.js';
export declare class DispatchEngine {
    private readonly rideService;
    private readonly eligibilityPolicy;
    private readonly rankingPolicy;
    private readonly locationProvider;
    private readonly logger;
    private offers;
    constructor(rideService: RideService, eligibilityPolicy: DriverEligibilityPolicy, rankingPolicy: DriverRankingPolicy, locationProvider: MockDriverLocationProvider);
    handleRideCreatedEvent(ride: Ride): Promise<void>;
    acceptOffer(offerId: string, driverId: string): Promise<void>;
    rejectOffer(offerId: string, driverId: string): Promise<void>;
}
