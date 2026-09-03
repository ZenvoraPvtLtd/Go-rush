import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './application/auth.service';
import { OTP_PROVIDER_TOKEN } from './domain/auth.types';
import { MockOtpProvider } from './infrastructure/mock-otp.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: OTP_PROVIDER_TOKEN,
      useClass: MockOtpProvider,
    },
  ],
})
export class AuthModule {}
