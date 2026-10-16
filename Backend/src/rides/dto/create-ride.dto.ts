
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class LocationDto {
  lat: number;
  lng: number;
  address?: string;
}

export class CreateRideDto {
  @IsString()
  @IsNotEmpty()
  quoteId: string;

  @IsNotEmpty()
  pickup: LocationDto;

  @IsNotEmpty()
  destination: LocationDto;

  @IsString()
  @IsOptional()
  vehicleType?: string;
}

