import { Ride } from '../domain/ride.js';
import { QuoteService } from '../../pricing/application/quote.service.js';
export declare class RideService {
    private readonly quoteService;
    constructor(quoteService: QuoteService);
    private rides;
    private activeRidesByCustomer;
    private idempotencyStore;
    createRide(customerId: string, quoteId: string, idempotencyKey: string): Promise<Ride>;
    failDispatch(rideId: string, customerId: string): Promise<void>;
    assignDriverToRide(rideId: string, driverId: string): Promise<void>;
    getActiveRide(customerId: string): Promise<Ride | null>;
    getRide(rideId: string, customerId: string): Promise<Ride>;
    cancelRide(rideId: string, customerId: string, reason: string): Promise<Ride>;
    private transitionState;
}
