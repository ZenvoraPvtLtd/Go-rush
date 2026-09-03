export interface SendOtpDto {
  phoneNumber: string;
}

export interface VerifyOtpDto {
  phoneNumber: string;
  otp: string;
}

export interface RefreshDto {
  refreshToken: string;
}

export interface AuthResponse {
  user: {
    id: string;
    phoneNumber: string;
    profileComplete: boolean;
  };
  session: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
  };
}

export interface OtpProvider {
  sendOtp(phoneNumber: string): Promise<void>;
  verifyOtp(phoneNumber: string, otp: string): Promise<boolean>;
}

export const OTP_PROVIDER_TOKEN = 'OtpProviderToken';
