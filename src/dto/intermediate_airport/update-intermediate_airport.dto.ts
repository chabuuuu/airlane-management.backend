// src/dto/update-intermediate-airport.dto.ts
import { Type } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateIntermediateAirportDto {

  @IsOptional()
  @IsString()
  flightId?: string;


  @IsOptional()
  @IsString()
  airportId?: number;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  duration?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
