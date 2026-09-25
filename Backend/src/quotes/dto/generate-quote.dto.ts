
import { IsNumber, IsNotEmpty, Min, IsString } from 'class-validator';

export class GenerateQuoteDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  distance: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  time: number;

  @IsString()
  @IsNotEmpty()
  vehicleType: string;
}
