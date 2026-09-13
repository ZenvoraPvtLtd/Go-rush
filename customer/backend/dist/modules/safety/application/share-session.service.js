var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ShareSessionService_1;
import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { RideShareStatus, RideShareStateMachine } from '../domain/ride-share-session.js';
import { MockWhatsAppProvider } from './whatsapp-messaging-provider.js';
let ShareSessionService = ShareSessionService_1 = class ShareSessionService {
    whatsappProvider;
    logger = new Logger(ShareSessionService_1.name);
    sessions = new Map();
    constructor(whatsappProvider) {
        this.whatsappProvider = whatsappProvider;
    }
    async createShareSession(customerId, rideId, recipientName, recipientPhone) {
        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = this.hashToken(token);
        const phoneHash = this.hashToken(recipientPhone);
        const session = {
            id: `share_${crypto.randomUUID()}`,
            rideId,
            customerId,
            recipientName,
            recipientPhoneHash: phoneHash,
            status: RideShareStatus.PENDING,
            tokenHash,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            consentVersion: '1.0'
        };
        this.sessions.set(session.id, session);
        this.logger.log(`Share session ${session.id} created by Customer ${customerId}`);
        const trackingUrl = `https://track.gorush.com/live/${token}`;
        const delivered = await this.whatsappProvider.sendRideShareMessage(recipientPhone, trackingUrl, 'Rohit');
        if (delivered && RideShareStateMachine.canTransition(session.status, RideShareStatus.ACTIVE)) {
            session.status = RideShareStatus.ACTIVE;
        }
        return { shareId: session.id, success: delivered };
    }
    async validateTrackingToken(token) {
        const hash = this.hashToken(token);
        let foundSession = null;
        for (const session of this.sessions.values()) {
            if (session.tokenHash === hash) {
                foundSession = session;
                break;
            }
        }
        if (!foundSession)
            return null;
        if (foundSession.status !== RideShareStatus.ACTIVE) {
            return null;
        }
        if (foundSession.expiresAt < new Date()) {
            foundSession.status = RideShareStatus.EXPIRED;
            return null;
        }
        return foundSession;
    }
    async revokeShare(customerId, shareId) {
        const session = this.sessions.get(shareId);
        if (!session || session.customerId !== customerId)
            return false;
        if (RideShareStateMachine.canTransition(session.status, RideShareStatus.REVOKED)) {
            session.status = RideShareStatus.REVOKED;
            session.revokedAt = new Date();
            this.logger.log(`Share session ${shareId} revoked by customer.`);
            return true;
        }
        return false;
    }
    hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
};
ShareSessionService = ShareSessionService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MockWhatsAppProvider])
], ShareSessionService);
export { ShareSessionService };
//# sourceMappingURL=share-session.service.js.map