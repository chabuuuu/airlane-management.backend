// src/dto/create-intermediate-airport.dto.ts
import { IsDecimal, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateIntermediateAirportDto {
  @IsUUID()
  flightID!: string;

  @IsUUID()
  airportID!: string;

  @IsDecimal()
  duration!: number;

  @IsString()
  @IsNotEmpty()
  notes!: string;
}
