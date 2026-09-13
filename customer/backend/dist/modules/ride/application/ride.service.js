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
import { RideStatus } from '../domain/ride.js';
import { RideStateMachine } from '../domain/ride-state-machine.js';
import { QuoteService } from '../../pricing/application/quote.service.js';
import * as crypto from 'crypto';
let RideService = class RideService {
    quoteService;
    constructor(quoteService) {
        this.quoteService = quoteService;
    }
    rides = new Map();
    activeRidesByCustomer = new Map();
    idempotencyStore = new Map();
    async createRide(customerId, quoteId, idempotencyKey) {
        if (this.idempotencyStore.has(idempotencyKey)) {
            return this.idempotencyStore.get(idempotencyKey);
        }
        if (this.activeRidesByCustomer.has(customerId)) {
            throw new BadRequestException({ code: 'RIDE_ALREADY_ACTIVE', message: 'You already have an active ride.' });
        }
        const quote = await this.quoteService.getQuote(quoteId, customerId);
        if (quote.expiresAt < new Date()) {
            throw new BadRequestException({ code: 'RIDE_QUOTE_EXPIRED', message: 'Your fare has expired. Please get a new quote.' });
        }
        if (quote.status !== 'ACTIVE') {
            throw new BadRequestException({ code: 'RIDE_QUOTE_INVALID', message: 'This quote is no longer valid.' });
        }
        quote.status = 'ACCEPTED';
        const newRide = {
            rideId: crypto.randomUUID(),
            customerId,
            status: RideStatus.REQUESTED,
            quoteSnapshot: quote,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.rides.set(newRide.rideId, newRide);
        this.activeRidesByCustomer.set(customerId, newRide.rideId);
        this.idempotencyStore.set(idempotencyKey, newRide);
        console.log(`[RideEventPublisher] Published RideCreated for rideId: ${newRide.rideId}`);
        await this.transitionState(newRide.rideId, customerId, RideStatus.SEARCHING);
        return this.rides.get(newRide.rideId);
    }
    async failDispatch(rideId, customerId) {
        await this.transitionState(rideId, customerId, RideStatus.NO_DRIVER);
    }
    async assignDriverToRide(rideId, driverId) {
        const ride = this.rides.get(rideId);
        if (!ride)
            throw new Error('Ride not found');
        if (ride.status !== RideStatus.SEARCHING) {
            throw new Error('Ride is no longer searching. It may have been cancelled.');
        }
        await this.transitionState(rideId, ride.customerId, RideStatus.DRIVER_ASSIGNED);
    }
    async getActiveRide(customerId) {
        const activeRideId = this.activeRidesByCustomer.get(customerId);
        if (!activeRideId)
            return null;
        return this.rides.get(activeRideId) || null;
    }
    async getRide(rideId, customerId) {
        const ride = this.rides.get(rideId);
        if (!ride) {
            throw new NotFoundException({ code: 'RIDE_NOT_FOUND', message: 'Ride not found' });
        }
        if (ride.customerId !== customerId) {
            throw new BadRequestException({ code: 'RIDE_UNAUTHORIZED', message: 'Unauthorized access' });
        }
        return ride;
    }
    async cancelRide(rideId, customerId, reason) {
        const ride = await this.getRide(rideId, customerId);
        RideStateMachine.validateTransition(ride.status, RideStatus.CANCELLED);
        ride.status = RideStatus.CANCELLED;
        ride.cancellationReason = reason;
        ride.updatedAt = new Date();
        this.activeRidesByCustomer.delete(customerId);
        console.log(`[RideEventPublisher] Published RideCancelled for rideId: ${ride.rideId}`);
        return ride;
    }
    async transitionState(rideId, customerId, nextState) {
        const ride = await this.getRide(rideId, customerId);
        RideStateMachine.validateTransition(ride.status, nextState);
        ride.status = nextState;
        ride.updatedAt = new Date();
        if (RideStateMachine.isTerminal(nextState)) {
            this.activeRidesByCustomer.delete(customerId);
        }
    }
};
RideService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [QuoteService])
], RideService);
export { RideService };
//# sourceMappingURL=ride.service.js.map