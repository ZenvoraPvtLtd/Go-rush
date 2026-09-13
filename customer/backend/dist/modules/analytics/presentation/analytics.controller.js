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
import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
let AnalyticsController = class AnalyticsController {
    isAnalyticsEnabled() {
        return process.env.ANALYTICS_DASHBOARD_ENABLED === 'true';
    }
    checkAccess(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer admin-')) {
            throw new UnauthorizedException('Admin access required');
        }
        if (!this.isAnalyticsEnabled()) {
            throw new UnauthorizedException('Analytics dashboard is currently disabled');
        }
    }
    async getOverview(authHeader) {
        this.checkAccess(authHeader);
        return {
            state: 'DATA_UNAVAILABLE',
            generatedAt: new Date().toISOString(),
            message: 'Source events not yet propagated to analytical models. No fabricated data allowed.',
            data: null
        };
    }
    async getFinanceAnalytics(authHeader) {
        this.checkAccess(authHeader);
        if (process.env.FINANCIAL_ANALYTICS_ENABLED !== 'true') {
            return { state: 'PERMISSION_DENIED', message: 'Financial analytics module disabled' };
        }
        return {
            state: 'DATA_UNAVAILABLE',
            generatedAt: new Date().toISOString(),
            data: null
        };
    }
};
__decorate([
    Get('overview'),
    __param(0, Headers('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getOverview", null);
__decorate([
    Get('finance'),
    __param(0, Headers('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getFinanceAnalytics", null);
AnalyticsController = __decorate([
    Controller('v1/admin/analytics')
], AnalyticsController);
export { AnalyticsController };
//# sourceMappingURL=analytics.controller.js.map