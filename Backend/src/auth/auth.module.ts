import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { DriversModule } from '../drivers/drivers.module.js';

@Module({
  imports: [
    UsersModule,
    DriversModule,
    PassportModule,
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY', // In production, move to .env
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
