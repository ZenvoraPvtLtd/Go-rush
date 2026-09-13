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
import { Controller, Post, Get, Body, UnauthorizedException, Headers } from '@nestjs/common';
import { ShareSessionService } from '../application/share-session.service.js';
import { SharedRideLocationMapper } from '../domain/shared-ride-location.js';
let TrackingController = class TrackingController {
    shareSessionService;
    redisStoreMock;
    rideServiceMock;
    constructor(shareSessionService) {
        this.shareSessionService = shareSessionService;
    }
    async exchangeToken(trackingToken) {
        const session = await this.shareSessionService.validateTrackingToken(trackingToken);
        if (!session) {
            throw new UnauthorizedException('Ride sharing link is invalid, expired, or revoked.');
        }
        const viewerSessionToken = `viewer_jwt_${session.id}`;
        return {
            viewerToken: viewerSessionToken,
            expiresIn: 3600
        };
    }
    async getSharedRideState(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer viewer_jwt_')) {
            throw new UnauthorizedException('Invalid viewer session.');
        }
        const shareId = authHeader.replace('Bearer viewer_jwt_', '');
        const mockRawLocation = { latitude: 22.7196, longitude: 75.8577, timestamp: new Date() };
        return {
            status: 'DRIVER_EN_ROUTE',
            etaMinutes: 4,
            location: SharedRideLocationMapper.fromInternalPayload(mockRawLocation)
        };
    }
};
__decorate([
    Post('exchange'),
    __param(0, Body('trackingToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "exchangeToken", null);
__decorate([
    Get('state'),
    __param(0, Headers('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getSharedRideState", null);
TrackingController = __decorate([
    Controller('v1/public/ride-share'),
    __metadata("design:paramtypes", [ShareSessionService])
], TrackingController);
export { TrackingController };
//# sourceMappingURL=tracking.controller.js.map