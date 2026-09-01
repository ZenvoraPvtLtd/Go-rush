import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) { // Basic check for now (no bcrypt hash check yet)
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(data: any) {
    // In a real app, hash password with bcrypt here
    return this.usersService.create(data);
  }

  async generateOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10); // Valid for 10 mins

    await this.usersService.updateOtp(email, otp, expiry);
    
    // In production, send SMS/Email here using Twilio/SendGrid
    console.log(`[OTP Sent to ${email}]: ${otp}`);
    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.otpCode === otp && user.otpExpiry && user.otpExpiry > new Date()) {
      return { verified: true };
    }
    throw new UnauthorizedException('Invalid or expired OTP');
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    await this.verifyOtp(email, otp);
    // Hash new password here
    await this.usersService.updatePassword(email, newPassword);
    return { message: 'Password reset successful' };
  }
}
