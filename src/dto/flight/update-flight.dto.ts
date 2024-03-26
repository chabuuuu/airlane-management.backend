// src/dto/update-flight.dto.ts
import { IsDateString, IsDecimal, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateFlightDto {
  @IsString()
  @IsOptional()
  flightCode?: string;

  @IsUUID()
  @IsOptional()
  departureAirportId?: string;

  @IsUUID()
  @IsOptional()
  arrivalAirportId?: string;

  @IsDateString()
  @IsOptional()
  departureTime?: string;

  @IsDecimal()
  @IsOptional()
  flightDuration?: number;

  @IsDecimal()
  @IsOptional()
  economyPrice?: number;

  @IsDecimal()
  @IsOptional()
  businessPrice?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
