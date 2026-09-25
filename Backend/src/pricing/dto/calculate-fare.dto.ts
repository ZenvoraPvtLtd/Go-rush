
import { IsNumber, IsNotEmpty, Min, IsOptional, IsString } from 'class-validator';

export class CalculateFareDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  distance: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  time: number;

  @IsString()
  @IsOptional()
  vehicleType?: string;
}
