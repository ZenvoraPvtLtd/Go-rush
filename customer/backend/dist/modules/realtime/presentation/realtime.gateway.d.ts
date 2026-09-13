import { LocationIngestionService } from '../application/location-ingestion.service.js';
import { RedisLocationStore } from '../infrastructure/redis-location-store.js';
import { DriverLocationPayload } from '../domain/location-payload.js';
export declare class RealtimeGateway {
    private readonly ingestionService;
    private readonly locationStore;
    private readonly logger;
    private connectedClients;
    constructor(ingestionService: LocationIngestionService, locationStore: RedisLocationStore);
    handleDriverLocationPublish(clientId: string, payload: DriverLocationPayload): Promise<void>;
    handleCustomerSubscribe(clientId: string, authHeader: string, rideId: string): Promise<void>;
    private broadcastToRide;
}
