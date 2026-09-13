var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Get, Param, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { QuoteService } from '../application/quote.service.js';
let PricingController = class PricingController {
    quoteService;
    constructor(quoteService) {
        this.quoteService = quoteService;
    }
    async createQuotes(authHeader, idempotencyKey, distanceMeters, durationSeconds) {
        const customerId = authHeader ? 'cust_123' : null;
        if (!customerId)
            throw new UnauthorizedException();
        return this.quoteService.generateQuotes(customerId, distanceMeters, durationSeconds, idempotencyKey);
    }
    async getQuote(authHeader, id) {
        const customerId = authHeader ? 'cust_123' : null;
        if (!customerId)
            throw new UnauthorizedException();
        return this.quoteService.getQuote(id, customerId);
    }
};
__decorate([
    Post(),
    __param(0, Headers('Authorization')),
    __param(1, Headers('Idempotency-Key')),
    __param(2, Body('distanceMeters')),
    __param(3, Body('durationSeconds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "createQuotes", null);
__decorate([
    Get(':id'),
    __param(0, Headers('Authorization')),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "getQuote", null);
PricingController = __decorate([
    Controller('v1/quotes'),
    __metadata("design:paramtypes", [QuoteService])
], PricingController);
export { PricingController };
//# sourceMappingURL=pricing.controller.js.map