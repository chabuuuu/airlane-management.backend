// src/dto/update-airplane.dto.ts
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAirplaneDto {
  @IsUUID()
  @IsOptional()
  flightId?: string;

  @IsString()
  @IsOptional()
  airplaneModel?: string;

  @IsString()
  @IsOptional()
  airlines?: string;
}
