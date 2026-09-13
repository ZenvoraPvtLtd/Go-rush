import { RideService } from '../application/ride.service.js';
export declare class RideController {
    private readonly rideService;
    constructor(rideService: RideService);
    private extractCustomer;
    createRide(authHeader: string, idempotencyKey: string, quoteId: string): Promise<import("../domain/ride.js").Ride>;
    getActiveRide(authHeader: string): Promise<import("../domain/ride.js").Ride | null>;
    getRide(authHeader: string, id: string): Promise<import("../domain/ride.js").Ride>;
    cancelRide(authHeader: string, rideId: string, reason: string): Promise<import("../domain/ride.js").Ride>;
    getRealtimeState(authHeader: string, rideId: string): Promise<{
        rideId: string;
        status: import("../domain/ride.js").RideStatus;
        latestLocation: null;
    }>;
}
