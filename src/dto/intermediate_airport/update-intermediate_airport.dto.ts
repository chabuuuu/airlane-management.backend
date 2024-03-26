// src/dto/update-intermediate-airport.dto.ts
import { IsDecimal, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateIntermediateAirportDto {
  @IsUUID()
  @IsOptional()
  flightID?: string;

  @IsUUID()
  @IsOptional()
  airportID?: string;

  @IsDecimal()
  @IsOptional()
  duration?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
