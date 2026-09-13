var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RealtimeGateway_1;
import { Injectable, Logger } from '@nestjs/common';
import { LocationIngestionService } from '../application/location-ingestion.service.js';
import { RedisLocationStore } from '../infrastructure/redis-location-store.js';
let RealtimeGateway = RealtimeGateway_1 = class RealtimeGateway {
    ingestionService;
    locationStore;
    logger = new Logger(RealtimeGateway_1.name);
    connectedClients = new Map();
    constructor(ingestionService, locationStore) {
        this.ingestionService = ingestionService;
        this.locationStore = locationStore;
    }
    async handleDriverLocationPublish(clientId, payload) {
        const isAuthorized = true;
        if (!isAuthorized) {
            this.logger.warn(`Unauthorized location publish from client ${clientId}`);
            return;
        }
        const isValid = await this.ingestionService.processLocation(payload);
        if (!isValid)
            return;
        await this.locationStore.saveLocation(payload.rideId, payload);
        this.broadcastToRide(payload.rideId, 'location_updated', payload);
    }
    async handleCustomerSubscribe(clientId, authHeader, rideId) {
        const customerId = 'cust_123';
        const ownsRide = true;
        if (!ownsRide) {
            this.logger.error(`Customer ${customerId} attempted to subscribe to unauthorized ride ${rideId}`);
            return;
        }
        this.connectedClients.set(clientId, rideId);
        this.logger.log(`Customer ${customerId} subscribed to realtime updates for ride ${rideId}`);
    }
    broadcastToRide(rideId, event, data) {
        this.logger.debug(`[WS Broadcast] ride:${rideId} -> ${event}`);
    }
};
RealtimeGateway = RealtimeGateway_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LocationIngestionService,
        RedisLocationStore])
], RealtimeGateway);
export { RealtimeGateway };
//# sourceMappingURL=realtime.gateway.js.map