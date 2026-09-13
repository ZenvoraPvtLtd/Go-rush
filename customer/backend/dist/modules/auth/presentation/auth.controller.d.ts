import { AuthService } from '../application/auth.service.js';
import { SendOtpDto, VerifyOtpDto, RefreshDto } from '../domain/auth.types.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    sendOtp(dto: SendOtpDto): Promise<{
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<import("../domain/auth.types.js").AuthResponse>;
    refresh(dto: RefreshDto): Promise<import("../domain/auth.types.js").AuthResponse>;
    logout(): Promise<{
        message: string;
    }>;
}
