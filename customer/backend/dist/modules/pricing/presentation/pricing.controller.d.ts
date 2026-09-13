import { QuoteService } from '../application/quote.service.js';
export declare class PricingController {
    private readonly quoteService;
    constructor(quoteService: QuoteService);
    createQuotes(authHeader: string, idempotencyKey: string, distanceMeters: number, durationSeconds: number): Promise<import("../domain/quote.js").Quote[]>;
    getQuote(authHeader: string, id: string): Promise<import("../domain/quote.js").Quote>;
}
