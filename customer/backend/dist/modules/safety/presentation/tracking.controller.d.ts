import { ShareSessionService } from '../application/share-session.service.js';
export declare class TrackingController {
    private readonly shareSessionService;
    private readonly redisStoreMock;
    private readonly rideServiceMock;
    constructor(shareSessionService: ShareSessionService);
    exchangeToken(trackingToken: string): Promise<{
        viewerToken: string;
        expiresIn: number;
    }>;
    getSharedRideState(authHeader: string): Promise<{
        status: string;
        etaMinutes: number;
        location: import("../domain/shared-ride-location.js").SharedRideLocation;
    }>;
}
