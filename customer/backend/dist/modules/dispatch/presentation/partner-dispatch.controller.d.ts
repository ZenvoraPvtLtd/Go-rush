import { DispatchEngine } from '../application/dispatch.engine.js';
export declare class PartnerDispatchController {
    private readonly dispatchEngine;
    constructor(dispatchEngine: DispatchEngine);
    private extractDriver;
    acceptOffer(authHeader: string, offerId: string): Promise<{
        success: boolean;
    }>;
    rejectOffer(authHeader: string, offerId: string): Promise<{
        success: boolean;
    }>;
}
