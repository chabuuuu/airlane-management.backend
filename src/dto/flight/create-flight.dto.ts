// src/dto/create-flight.dto.ts
import { IsDateString, IsDecimal, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  @IsNotEmpty()
  flightCode!: string;

  @IsUUID()
  departureAirportId!: string;

  @IsUUID()
  arrivalAirportId!: string;

  @IsDateString()
  departureTime!: string;

  @IsDecimal()
  flightDuration!: number;

  @IsDecimal()
  economyPrice!: number;

  @IsDecimal()
  businessPrice!: number;

  @IsString()
  status!: string;

  @IsString()
  description?: string;
}
