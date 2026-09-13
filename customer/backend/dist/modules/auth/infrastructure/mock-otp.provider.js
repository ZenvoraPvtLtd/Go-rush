var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MockOtpProvider_1;
import { Injectable, Logger } from '@nestjs/common';
let MockOtpProvider = MockOtpProvider_1 = class MockOtpProvider {
    logger = new Logger(MockOtpProvider_1.name);
    async sendOtp(phoneNumber) {
        this.logger.log(`[MOCK] Sending OTP to ${phoneNumber}. Use 123456 to verify.`);
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
    async verifyOtp(phoneNumber, otp) {
        this.logger.log(`[MOCK] Verifying OTP ${otp} for ${phoneNumber}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
        return otp === '123456';
    }
};
MockOtpProvider = MockOtpProvider_1 = __decorate([
    Injectable()
], MockOtpProvider);
export { MockOtpProvider };
//# sourceMappingURL=mock-otp.provider.js.map