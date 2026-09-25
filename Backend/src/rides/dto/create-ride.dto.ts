
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRideDto {
  @IsString()
  @IsNotEmpty()
  quoteId: string;

  @IsString()
  @IsNotEmpty()
  pickup: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsOptional()
  vehicleType?: string;
}
