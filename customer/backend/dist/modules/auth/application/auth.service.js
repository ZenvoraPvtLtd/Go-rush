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
import { Injectable, Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { OTP_PROVIDER_TOKEN } from '../domain/auth.types.js';
let AuthService = class AuthService {
    otpProvider;
    constructor(otpProvider) {
        this.otpProvider = otpProvider;
    }
    async sendOtp(dto) {
        if (!dto.phoneNumber) {
            throw new BadRequestException({ code: 'AUTH_001', message: 'Phone number is required' });
        }
        await this.otpProvider.sendOtp(dto.phoneNumber);
        return { message: 'OTP Sent' };
    }
    async verifyOtp(dto) {
        const isValid = await this.otpProvider.verifyOtp(dto.phoneNumber, dto.otp);
        if (!isValid) {
            throw new UnauthorizedException({ code: 'AUTH_002', message: 'Invalid OTP' });
        }
        return {
            user: {
                id: 'cust_mock_123',
                phoneNumber: dto.phoneNumber,
                profileComplete: false,
            },
            session: {
                accessToken: 'mock_access_token_' + Date.now(),
                refreshToken: 'mock_refresh_token_' + Date.now(),
                expiresAt: new Date(Date.now() + 3600000).toISOString(),
            },
        };
    }
    async refresh(dto) {
        if (!dto.refreshToken || !dto.refreshToken.startsWith('mock_refresh')) {
            throw new UnauthorizedException({ code: 'AUTH_003', message: 'Invalid Refresh Token' });
        }
        return {
            user: {
                id: 'cust_mock_123',
                phoneNumber: 'UNKNOWN',
                profileComplete: true,
            },
            session: {
                accessToken: 'mock_access_token_' + Date.now(),
                refreshToken: 'mock_refresh_token_' + Date.now(),
                expiresAt: new Date(Date.now() + 3600000).toISOString(),
            },
        };
    }
    async logout() {
        return { message: 'Logged out successfully' };
    }
};
AuthService = __decorate([
    Injectable(),
    __param(0, Inject(OTP_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [Object])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map