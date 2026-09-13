import { OtpProvider, AuthResponse, SendOtpDto, VerifyOtpDto, RefreshDto } from '../domain/auth.types.js';
export declare class AuthService {
    private readonly otpProvider;
    constructor(otpProvider: OtpProvider);
    sendOtp(dto: SendOtpDto): Promise<{
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<AuthResponse>;
    refresh(dto: RefreshDto): Promise<AuthResponse>;
    logout(): Promise<{
        message: string;
    }>;
}
