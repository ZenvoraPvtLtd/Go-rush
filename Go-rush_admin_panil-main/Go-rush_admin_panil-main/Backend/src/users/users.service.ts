import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: any) {
    return this.prisma.user.create({ data });
  }

  async updateOtp(email: string, otp: string, expiry: Date) {
    return this.prisma.user.update({
      where: { email },
      data: { otpCode: otp, otpExpiry: expiry },
    });
  }

  async updatePassword(email: string, password: string) {
    return this.prisma.user.update({
      where: { email },
      data: { password, otpCode: null, otpExpiry: null },
    });
  }
}
