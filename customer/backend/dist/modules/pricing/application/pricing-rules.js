import { Money } from '../domain/money.js';
import { RideCategoryType } from '../domain/ride-category.js';
export class BaseFareRule {
    evaluate(context) {
        const baseFares = {
            [RideCategoryType.BIKE]: 2000,
            [RideCategoryType.AUTO]: 3000,
            [RideCategoryType.MINI_SEDAN]: 5000,
        };
        return { type: 'BASE_FARE', label: 'Base Fare', amount: new Money(baseFares[context.category]) };
    }
}
export class DistanceFareRule {
    evaluate(context) {
        const km = context.distanceMeters / 1000;
        const perKm = {
            [RideCategoryType.BIKE]: 500,
            [RideCategoryType.AUTO]: 1000,
            [RideCategoryType.MINI_SEDAN]: 1200,
        };
        const amount = Math.floor(km * perKm[context.category]);
        return { type: 'DISTANCE_FARE', label: 'Distance Fare', amount: new Money(amount) };
    }
}
export class BookingFeeRule {
    evaluate(context) {
        return { type: 'BOOKING_FEE', label: 'Booking Fee', amount: new Money(500) };
    }
}
//# sourceMappingURL=pricing-rules.js.map