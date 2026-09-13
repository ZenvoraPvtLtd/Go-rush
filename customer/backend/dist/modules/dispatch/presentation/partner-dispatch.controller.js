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
import { Controller, Post, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { DispatchEngine } from '../application/dispatch.engine.js';
let PartnerDispatchController = class PartnerDispatchController {
    dispatchEngine;
    constructor(dispatchEngine) {
        this.dispatchEngine = dispatchEngine;
    }
    extractDriver(authHeader) {
        const driverId = authHeader ? 'drv_1' : null;
        if (!driverId)
            throw new UnauthorizedException();
        return driverId;
    }
    async acceptOffer(authHeader, offerId) {
        const driverId = this.extractDriver(authHeader);
        await this.dispatchEngine.acceptOffer(offerId, driverId);
        return { success: true };
    }
    async rejectOffer(authHeader, offerId) {
        const driverId = this.extractDriver(authHeader);
        await this.dispatchEngine.rejectOffer(offerId, driverId);
        return { success: true };
    }
};
__decorate([
    Post(':offerId/accept'),
    __param(0, Headers('Authorization')),
    __param(1, Param('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PartnerDispatchController.prototype, "acceptOffer", null);
__decorate([
    Post(':offerId/reject'),
    __param(0, Headers('Authorization')),
    __param(1, Param('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PartnerDispatchController.prototype, "rejectOffer", null);
PartnerDispatchController = __decorate([
    Controller('v1/driver/offers'),
    __metadata("design:paramtypes", [DispatchEngine])
], PartnerDispatchController);
export { PartnerDispatchController };
//# sourceMappingURL=partner-dispatch.controller.js.map