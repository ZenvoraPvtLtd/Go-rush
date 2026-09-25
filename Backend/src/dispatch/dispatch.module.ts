import { Module } from '@nestjs/common';
import { DispatchService } from './dispatch.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RideTransitionService } from '../ride/ride-transition.service.js';

@Module({
  providers: [DispatchService, PrismaService, RideTransitionService],
  exports: [DispatchService],
})
export class DispatchModule {}
