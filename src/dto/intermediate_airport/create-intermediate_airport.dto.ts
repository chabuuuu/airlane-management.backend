// src/dto/create-intermediate-airport.dto.ts
import { Type } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateIntermediateAirportDto {

  @IsNotEmpty()
  @IsString()
  flightID!: string;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  airportID!: number;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  duration!: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
