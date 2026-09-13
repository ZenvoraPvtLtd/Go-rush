import { DriverLocationPayload } from '../domain/location-payload.js';
import { LocationSanityPolicy } from '../domain/location-sanity-policy.js';
export declare class LocationIngestionService {
    private readonly sanityPolicy;
    private readonly logger;
    private sequenceTracker;
    constructor(sanityPolicy: LocationSanityPolicy);
    processLocation(payload: DriverLocationPayload): Promise<boolean>;
}
