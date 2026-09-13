import { DriverLocationPayload } from '../domain/location-payload.js';
export declare class RedisLocationStore {
    private readonly store;
    saveLocation(rideId: string, payload: DriverLocationPayload): Promise<void>;
    getLocation(rideId: string): Promise<DriverLocationPayload | null>;
}
