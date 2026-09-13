import { DriverLocationPayload } from './location-payload.js';
export interface SanityResult {
    isValid: boolean;
    reason?: string;
}
export declare class LocationSanityPolicy {
    private readonly MAX_ACCEPTABLE_ACCURACY_METERS;
    evaluate(payload: DriverLocationPayload): SanityResult;
}
