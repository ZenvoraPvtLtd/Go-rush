import { Controller, Get, Query, Param } from '@nestjs/common';
import { PlacesService } from '../application/places.service.js';

@Controller('v1/places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('autocomplete')
  async autocomplete(@Query('q') query: string) {
    return this.placesService.autocomplete(query);
  }

  @Get('geocode')
  async geocode(@Query('address') address: string) {
    return this.placesService.geocode(address);
  }

  @Get('reverse-geocode')
  async reverseGeocode(@Query('lat') lat: number, @Query('lng') lng: number) {
    return this.placesService.reverseGeocode(lat, lng);
  }

  @Get('details/:placeId')
  async placeDetails(@Param('placeId') placeId: string) {
    return this.placesService.placeDetails(placeId);
  }
}
