import { Quote } from '../../pricing/domain/quote.js';
export declare enum RideStatus {
    REQUESTED = "REQUESTED",
    SEARCHING = "SEARCHING",
    DRIVER_ASSIGNED = "DRIVER_ASSIGNED",
    DRIVER_EN_ROUTE = "DRIVER_EN_ROUTE",
    DRIVER_ARRIVED = "DRIVER_ARRIVED",
    RIDE_STARTED = "RIDE_STARTED",
    RIDE_IN_PROGRESS = "RIDE_IN_PROGRESS",
    RIDE_COMPLETED = "RIDE_COMPLETED",
    CANCELLED = "CANCELLED",
    NO_DRIVER = "NO_DRIVER",
    FAILED = "FAILED"
}
export interface Ride {
    rideId: string;
    customerId: string;
    status: RideStatus;
    quoteSnapshot: Quote;
    createdAt: Date;
    updatedAt: Date;
    cancellationReason?: string;
}
