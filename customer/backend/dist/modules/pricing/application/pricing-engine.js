var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { BaseFareRule, DistanceFareRule, BookingFeeRule } from './pricing-rules.js';
import { Money } from '../domain/money.js';
let PricingEngine = class PricingEngine {
    rules = [
        new BaseFareRule(),
        new DistanceFareRule(),
        new BookingFeeRule(),
    ];
    calculateFare(context) {
        const components = [];
        let subtotalMinor = 0;
        for (const rule of this.rules) {
            const result = rule.evaluate(context);
            if (result) {
                components.push(result);
                subtotalMinor += result.amount.amountMinor;
            }
        }
        const subtotal = new Money(subtotalMinor, 'INR');
        const discount = new Money(0, 'INR');
        const taxMinor = Math.floor(subtotalMinor * 0.05);
        const tax = new Money(taxMinor, 'INR');
        const totalMinor = subtotalMinor - discount.amountMinor + taxMinor;
        const total = new Money(totalMinor, 'INR');
        return {
            subtotal,
            components,
            discount,
            tax,
            total,
        };
    }
};
PricingEngine = __decorate([
    Injectable()
], PricingEngine);
export { PricingEngine };
//# sourceMappingURL=pricing-engine.js.map