var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LocationIngestionService_1;
import { Injectable, Logger } from '@nestjs/common';
import { LocationSanityPolicy } from '../domain/location-sanity-policy.js';
let LocationIngestionService = LocationIngestionService_1 = class LocationIngestionService {
    sanityPolicy;
    logger = new Logger(LocationIngestionService_1.name);
    sequenceTracker = new Map();
    constructor(sanityPolicy) {
        this.sanityPolicy = sanityPolicy;
    }
    async processLocation(payload) {
        const sanity = this.sanityPolicy.evaluate(payload);
        if (!sanity.isValid) {
            this.logger.warn(`Rejected location for driver ${payload.driverId}: ${sanity.reason}`);
            return false;
        }
        const trackerKey = `ride:${payload.rideId}:driver:${payload.driverId}`;
        const lastSequence = this.sequenceTracker.get(trackerKey) || 0;
        if (payload.sequenceNumber <= lastSequence) {
            this.logger.debug(`Ignored out-of-order/duplicate location seq ${payload.sequenceNumber} (latest is ${lastSequence})`);
            return false;
        }
        this.sequenceTracker.set(trackerKey, payload.sequenceNumber);
        return true;
    }
};
LocationIngestionService = LocationIngestionService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LocationSanityPolicy])
], LocationIngestionService);
export { LocationIngestionService };
//# sourceMappingURL=location-ingestion.service.js.map