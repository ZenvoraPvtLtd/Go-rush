import { RideShareSession } from '../domain/ride-share-session.js';
import { MockWhatsAppProvider } from './whatsapp-messaging-provider.js';
export declare class ShareSessionService {
    private readonly whatsappProvider;
    private readonly logger;
    private sessions;
    constructor(whatsappProvider: MockWhatsAppProvider);
    createShareSession(customerId: string, rideId: string, recipientName: string, recipientPhone: string): Promise<{
        shareId: string;
        success: boolean;
    }>;
    validateTrackingToken(token: string): Promise<RideShareSession | null>;
    revokeShare(customerId: string, shareId: string): Promise<boolean>;
    private hashToken;
}
