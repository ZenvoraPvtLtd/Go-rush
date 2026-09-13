export interface WhatsAppMessagingProvider {
    sendRideShareMessage(recipientPhone: string, shareUrl: string, customerName: string): Promise<boolean>;
}
export declare class MockWhatsAppProvider implements WhatsAppMessagingProvider {
    private readonly logger;
    sendRideShareMessage(recipientPhone: string, shareUrl: string, customerName: string): Promise<boolean>;
}
