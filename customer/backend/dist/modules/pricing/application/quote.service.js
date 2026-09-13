var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PricingEngine } from './pricing-engine.js';
import { CATEGORIES, RideCategoryType } from '../domain/ride-category.js';
import * as crypto from 'crypto';
let QuoteService = class QuoteService {
    pricingEngine;
    constructor(pricingEngine) {
        this.pricingEngine = pricingEngine;
    }
    quotes = new Map();
    idempotencyStore = new Map();
    async generateQuotes(customerId, distanceMeters, durationSeconds, idempotencyKey) {
        if (distanceMeters < 0 || durationSeconds < 0) {
            throw new BadRequestException({ code: 'QUOTE_INVALID_ROUTE', message: 'Invalid route' });
        }
        if (idempotencyKey && this.idempotencyStore.has(idempotencyKey)) {
            return this.idempotencyStore.get(idempotencyKey);
        }
        const categories = [RideCategoryType.BIKE, RideCategoryType.AUTO, RideCategoryType.MINI_SEDAN];
        const generatedQuotes = [];
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);
        for (const cat of categories) {
            const context = {
                category: cat,
                distanceMeters,
                durationSeconds,
                cityId: 'indore',
            };
            const fareBreakdown = this.pricingEngine.calculateFare(context);
            const quote = {
                quoteId: crypto.randomUUID(),
                customerId,
                rideCategory: CATEGORIES[cat],
                distanceMeters,
                durationSeconds,
                fareBreakdown,
                pricingVersion: 'v1.0.0',
                createdAt: now,
                expiresAt,
                status: 'ACTIVE',
            };
            this.quotes.set(quote.quoteId, quote);
            generatedQuotes.push(quote);
        }
        if (idempotencyKey) {
            this.idempotencyStore.set(idempotencyKey, generatedQuotes);
        }
        return generatedQuotes;
    }
    async getQuote(quoteId, customerId) {
        const quote = this.quotes.get(quoteId);
        if (!quote) {
            throw new NotFoundException({ code: 'QUOTE_NOT_FOUND', message: 'Quote not found' });
        }
        if (quote.customerId !== customerId) {
            throw new BadRequestException({ code: 'QUOTE_UNAUTHORIZED', message: 'Unauthorized quote access' });
        }
        return quote;
    }
};
QuoteService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PricingEngine])
], QuoteService);
export { QuoteService };
//# sourceMappingURL=quote.service.js.map