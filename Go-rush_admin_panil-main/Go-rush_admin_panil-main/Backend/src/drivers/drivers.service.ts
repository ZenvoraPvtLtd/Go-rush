import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.driver.findMany();
  }

  async findByEmail(email: string) {
    return this.prisma.driver.findUnique({ where: { email } });
  }

  async updateKyc(id: string, fileUrl: string) {
    return this.prisma.driver.update({
      where: { id },
      data: { licenseImageUrl: fileUrl },
    });
  }
}
