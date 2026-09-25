import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { RidesService } from './rides.service.js';
import { RidesController } from './rides.controller.js';
import { DispatchProcessor } from './dispatch.processor.js';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'dispatch',
    }),
  ],
  controllers: [RidesController],
  providers: [RidesService, DispatchProcessor],
})
export class RidesModule {}
