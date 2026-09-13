import { PricingEngine } from './pricing-engine.js';
import { Quote } from '../domain/quote.js';
export declare class QuoteService {
    private readonly pricingEngine;
    constructor(pricingEngine: PricingEngine);
    private quotes;
    private idempotencyStore;
    generateQuotes(customerId: string, distanceMeters: number, durationSeconds: number, idempotencyKey?: string): Promise<Quote[]>;
    getQuote(quoteId: string, customerId: string): Promise<Quote>;
}
