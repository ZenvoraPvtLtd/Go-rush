import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PricingEngine } from './pricing-engine.js';
import { Quote } from '../domain/quote.js';
import { CATEGORIES, RideCategoryType } from '../domain/ride-category.js';
import * as crypto from 'crypto';

@Injectable()
export class QuoteService {
  constructor(private readonly pricingEngine: PricingEngine) {}

  private quotes: Map<string, Quote> = new Map();
  // Using a simple map for idempotency in development. In prod, use Redis.
  private idempotencyStore: Map<string, Quote[]> = new Map();

  async generateQuotes(customerId: string, distanceMeters: number, durationSeconds: number, idempotencyKey?: string): Promise<Quote[]> {
    if (distanceMeters < 0 || durationSeconds < 0) {
      throw new BadRequestException({ code: 'QUOTE_INVALID_ROUTE', message: 'Invalid route' });
    }

    if (idempotencyKey && this.idempotencyStore.has(idempotencyKey)) {
      return this.idempotencyStore.get(idempotencyKey)!;
    }

    const categories = [RideCategoryType.BIKE, RideCategoryType.AUTO, RideCategoryType.MINI_SEDAN];
    const generatedQuotes: Quote[] = [];

    const now = new Date();
    // Configurable TTL: 5 minutes
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

    for (const cat of categories) {
      const context = {
        category: cat,
        distanceMeters,
        durationSeconds,
        cityId: 'indore',
      };

      const fareBreakdown = this.pricingEngine.calculateFare(context);
      
      const quote: Quote = {
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

  async getQuote(quoteId: string, customerId: string): Promise<Quote> {
    const quote = this.quotes.get(quoteId);
    if (!quote) {
      throw new NotFoundException({ code: 'QUOTE_NOT_FOUND', message: 'Quote not found' });
    }
    if (quote.customerId !== customerId) {
      throw new BadRequestException({ code: 'QUOTE_UNAUTHORIZED', message: 'Unauthorized quote access' });
    }
    return quote;
  }
}
