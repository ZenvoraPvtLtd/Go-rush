import { Injectable, Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { OtpProvider, OTP_PROVIDER_TOKEN, AuthResponse, SendOtpDto, VerifyOtpDto, RefreshDto } from '../domain/auth.types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(OTP_PROVIDER_TOKEN)
    private readonly otpProvider: OtpProvider,
  ) {}

  async sendOtp(dto: SendOtpDto): Promise<{ message: string }> {
    if (!dto.phoneNumber) {
      throw new BadRequestException({ code: 'AUTH_001', message: 'Phone number is required' });
    }
    await this.otpProvider.sendOtp(dto.phoneNumber);
    return { message: 'OTP Sent' };
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<AuthResponse> {
    const isValid = await this.otpProvider.verifyOtp(dto.phoneNumber, dto.otp);
    
    if (!isValid) {
      throw new UnauthorizedException({ code: 'AUTH_002', message: 'Invalid OTP' });
    }

    // Mock response generation (In real app, findOrCreate user, generate JWT)
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

  async refresh(dto: RefreshDto): Promise<AuthResponse> {
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

  async logout(): Promise<{ message: string }> {
    // Invalidate session
    return { message: 'Logged out successfully' };
  }
}
