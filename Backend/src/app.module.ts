import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { PrismaModule } from './prisma/prisma.module.js';
import { RedisModule } from './redis/redis.module.js';
import { UsersModule } from './users/users.module.js';
import { DriversModule } from './drivers/drivers.module.js';
import { AuthModule } from './auth/auth.module.js';
import { RidesModule } from './rides/rides.module.js';
import { BullModule } from '@nestjs/bullmq';
import { TrackingModule } from './tracking/tracking.module.js';
import { AdminModule } from './admin/admin.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { AnalyticsModule } from './analytics/analytics.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UsersModule,
    DriversModule,
    AuthModule,
    RidesModule,
    TrackingModule,
    AdminModule,
    PaymentsModule,
    AnalyticsModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'Backend',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
