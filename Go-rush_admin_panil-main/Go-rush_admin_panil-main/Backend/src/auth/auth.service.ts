import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    return this.usersService.create({ ...data, password: hashedPassword });
  }

  async generateOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10); // Valid for 10 mins

    await this.usersService.updateOtp(email, otp, expiry);
    
    // In production, send SMS/Email here using Twilio/SendGrid
    // console.log(`[OTP Sent to ${email}]: ${otp}`); // Removed for security
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await this.usersService.updatePassword(email, hashedPassword);
    return { message: 'Password reset successful' };
  }
}
