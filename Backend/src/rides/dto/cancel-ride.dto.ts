
import { IsString, IsOptional } from 'class-validator';

export class CancelRideDto {
  @IsString()
  @IsOptional()
  reason?: string;
}
