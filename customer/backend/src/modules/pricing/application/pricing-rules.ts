import { Money } from '../domain/money.js';
import { RideCategoryType } from '../domain/ride-category.js';

export interface PricingContext {
  category: RideCategoryType;
  distanceMeters: number;
  durationSeconds: number;
  cityId: string;
}

export interface PricingRule {
  evaluate(context: PricingContext): { type: string; label: string; amount: Money } | null;
}

export class BaseFareRule implements PricingRule {
  evaluate(context: PricingContext) {
    const baseFares = {
      [RideCategoryType.BIKE]: 2000, // ₹20.00
      [RideCategoryType.AUTO]: 3000, // ₹30.00
      [RideCategoryType.MINI_SEDAN]: 5000, // ₹50.00
    };
    return { type: 'BASE_FARE', label: 'Base Fare', amount: new Money(baseFares[context.category]) };
  }
}

export class DistanceFareRule implements PricingRule {
  evaluate(context: PricingContext) {
    const km = context.distanceMeters / 1000;
    const perKm = {
      [RideCategoryType.BIKE]: 500, // ₹5.00/km
      [RideCategoryType.AUTO]: 1000, // ₹10.00/km
      [RideCategoryType.MINI_SEDAN]: 1200, // ₹12.00/km
    };
    const amount = Math.floor(km * perKm[context.category]);
    return { type: 'DISTANCE_FARE', label: 'Distance Fare', amount: new Money(amount) };
  }
}

export class BookingFeeRule implements PricingRule {
  evaluate(context: PricingContext) {
    return { type: 'BOOKING_FEE', label: 'Booking Fee', amount: new Money(500) }; // ₹5.00
  }
}
