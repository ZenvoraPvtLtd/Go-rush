import { Module } from '@nestjs/common';
import { PlacesController } from './presentation/places.controller';
import { PlacesService } from './application/places.service';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
