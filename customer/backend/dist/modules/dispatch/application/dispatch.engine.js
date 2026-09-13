var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DispatchEngine_1;
import { Injectable, Logger } from '@nestjs/common';
import { RideService } from '../../ride/application/ride.service.js';
import { DriverEligibilityPolicy } from './driver-eligibility.policy.js';
import { DriverRankingPolicy } from './driver-ranking.policy.js';
import { MockDriverLocationProvider } from '../infrastructure/mock-driver-location.provider.js';
import { DriverOfferStatus } from '../domain/driver-offer.js';
import { DriverOfferStateMachine } from '../domain/driver-offer-state-machine.js';
import * as crypto from 'crypto';
let DispatchEngine = DispatchEngine_1 = class DispatchEngine {
    rideService;
    eligibilityPolicy;
    rankingPolicy;
    locationProvider;
    logger = new Logger(DispatchEngine_1.name);
    offers = new Map();
    constructor(rideService, eligibilityPolicy, rankingPolicy, locationProvider) {
        this.rideService = rideService;
        this.eligibilityPolicy = eligibilityPolicy;
        this.rankingPolicy = rankingPolicy;
        this.locationProvider = locationProvider;
    }
    async handleRideCreatedEvent(ride) {
        this.logger.log(`[DispatchWorker] Started dispatch for Ride ${ride.rideId}`);
        const dispatchId = crypto.randomUUID();
        try {
            const candidates = await this.locationProvider.findNearbyDrivers(22.7196, 75.8577, 5000);
            const eligible = candidates.filter((c) => {
                const result = this.eligibilityPolicy.evaluate(c.driver, ride.quoteSnapshot.rideCategory.code);
                return result.isEligible;
            });
            if (eligible.length === 0) {
                this.logger.warn(`[DispatchWorker] No eligible drivers found for Ride ${ride.rideId}.`);
                await this.rideService.failDispatch(ride.rideId, ride.customerId);
                return;
            }
            const ranked = this.rankingPolicy.rank(eligible);
            const topCandidate = ranked[0];
            const offerId = crypto.randomUUID();
            const offer = {
                offerId,
                dispatchId,
                rideId: ride.rideId,
                driverId: topCandidate.driver.driverId,
                status: DriverOfferStatus.PENDING,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 15000),
            };
            this.offers.set(offerId, offer);
            this.logger.log(`[DispatchWorker] Offer ${offerId} created for Driver ${topCandidate.driver.driverId}`);
            setTimeout(() => {
                this.acceptOffer(offerId, topCandidate.driver.driverId).catch(e => {
                    this.logger.error(`Simulated accept failed: ${e.message}`);
                });
            }, 3000);
        }
        catch (error) {
            this.logger.error(`[DispatchWorker] Error: ${error.message}`);
        }
    }
    async acceptOffer(offerId, driverId) {
        const offer = this.offers.get(offerId);
        if (!offer)
            throw new Error('Offer not found');
        if (offer.driverId !== driverId)
            throw new Error('Unauthorized offer acceptance');
        DriverOfferStateMachine.validateTransition(offer.status, DriverOfferStatus.ACCEPTED);
        if (offer.expiresAt < new Date()) {
            offer.status = DriverOfferStatus.EXPIRED;
            throw new Error('Offer expired');
        }
        await this.rideService.assignDriverToRide(offer.rideId, driverId);
        offer.status = DriverOfferStatus.ACCEPTED;
        offer.respondedAt = new Date();
        this.logger.log(`[DispatchWorker] Offer ${offerId} ACCEPTED. Ride ${offer.rideId} is now DRIVER_ASSIGNED.`);
    }
    async rejectOffer(offerId, driverId) {
        const offer = this.offers.get(offerId);
        if (!offer)
            throw new Error('Offer not found');
        if (offer.driverId !== driverId)
            throw new Error('Unauthorized');
        DriverOfferStateMachine.validateTransition(offer.status, DriverOfferStatus.REJECTED);
        offer.status = DriverOfferStatus.REJECTED;
        offer.respondedAt = new Date();
        this.logger.log(`[DispatchWorker] Offer ${offerId} REJECTED.`);
    }
};
DispatchEngine = DispatchEngine_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RideService,
        DriverEligibilityPolicy,
        DriverRankingPolicy,
        MockDriverLocationProvider])
], DispatchEngine);
export { DispatchEngine };
//# sourceMappingURL=dispatch.engine.js.map