import { PricingContext } from './pricing-rules.js';
import { FareBreakdown } from '../domain/quote.js';
export declare class PricingEngine {
    private rules;
    calculateFare(context: PricingContext): FareBreakdown;
}
