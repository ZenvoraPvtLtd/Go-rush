import { OtpProvider } from '../domain/auth.types.js';
export declare class MockOtpProvider implements OtpProvider {
    private readonly logger;
    sendOtp(phoneNumber: string): Promise<void>;
    verifyOtp(phoneNumber: string, otp: string): Promise<boolean>;
}
