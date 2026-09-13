import { Money } from '../domain/money.js';
import { RideCategoryType } from '../domain/ride-category.js';
export interface PricingContext {
    category: RideCategoryType;
    distanceMeters: number;
    durationSeconds: number;
    cityId: string;
}
export interface PricingRule {
    evaluate(context: PricingContext): {
        type: string;
        label: string;
        amount: Money;
    } | null;
}
export declare class BaseFareRule implements PricingRule {
    evaluate(context: PricingContext): {
        type: string;
        label: string;
        amount: Money;
    };
}
export declare class DistanceFareRule implements PricingRule {
    evaluate(context: PricingContext): {
        type: string;
        label: string;
        amount: Money;
    };
}
export declare class BookingFeeRule implements PricingRule {
    evaluate(context: PricingContext): {
        type: string;
        label: string;
        amount: Money;
    };
}
