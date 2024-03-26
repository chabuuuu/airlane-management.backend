// src/dto/update-intermediate-airport.dto.ts
import { Type } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateIntermediateAirportDto {

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  flightID?: number;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  airportID?: number;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  duration?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
