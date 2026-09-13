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
import { Controller, Post, Get, Param, Body, Headers, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { RideService } from '../application/ride.service.js';
let RideController = class RideController {
    rideService;
    constructor(rideService) {
        this.rideService = rideService;
    }
    extractCustomer(authHeader) {
        const customerId = authHeader ? 'cust_123' : null;
        if (!customerId)
            throw new UnauthorizedException();
        return customerId;
    }
    async createRide(authHeader, idempotencyKey, quoteId) {
        if (!idempotencyKey) {
            throw new BadRequestException({ code: 'RIDE_MISSING_IDEMPOTENCY', message: 'Idempotency-Key header is required' });
        }
        const customerId = this.extractCustomer(authHeader);
        return this.rideService.createRide(customerId, quoteId, idempotencyKey);
    }
    async getActiveRide(authHeader) {
        const customerId = this.extractCustomer(authHeader);
        return this.rideService.getActiveRide(customerId);
    }
    async getRide(authHeader, id) {
        const customerId = this.extractCustomer(authHeader);
        return this.rideService.getRide(id, customerId);
    }
    async cancelRide(authHeader, rideId, reason) {
        const customerId = this.extractCustomer(authHeader);
        return this.rideService.cancelRide(rideId, customerId, reason);
    }
    async getRealtimeState(authHeader, rideId) {
        const customerId = this.extractCustomer(authHeader);
        const ride = await this.rideService.getActiveRide(customerId);
        if (!ride || ride.rideId !== rideId) {
            throw new UnauthorizedException('Ride not found or not owned by user');
        }
        return {
            rideId: ride.rideId,
            status: ride.status,
            latestLocation: null,
        };
    }
};
__decorate([
    Post(),
    __param(0, Headers('Authorization')),
    __param(1, Headers('Idempotency-Key')),
    __param(2, Body('quoteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], RideController.prototype, "createRide", null);
__decorate([
    Get('active'),
    __param(0, Headers('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RideController.prototype, "getActiveRide", null);
__decorate([
    Get(':id'),
    __param(0, Headers('Authorization')),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RideController.prototype, "getRide", null);
__decorate([
    Post(':rideId/cancel'),
    __param(0, Headers('Authorization')),
    __param(1, Param('rideId')),
    __param(2, Body('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], RideController.prototype, "cancelRide", null);
__decorate([
    Get(':rideId/realtime-state'),
    __param(0, Headers('Authorization')),
    __param(1, Param('rideId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RideController.prototype, "getRealtimeState", null);
RideController = __decorate([
    Controller('v1/rides'),
    __metadata("design:paramtypes", [RideService])
], RideController);
export { RideController };
//# sourceMappingURL=ride.controller.js.map