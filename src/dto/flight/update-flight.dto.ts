// src/dto/update-flight.dto.ts
import { Type } from 'class-transformer';
import { IsDateString, IsDecimal, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateFlightDto {
  @IsString()
  @IsOptional()
  flightCode?: string;

  
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  departureAirportId?: string;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  arrivalAirportId?: string;

  @IsDateString()
  @IsOptional()
  departureTime?: Date;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  flightDuration?: number;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  economyPrice?: number;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  businessPrice?: number;

  @IsOptional()
  @IsEnum(['Chưa khởi hành', 'Đang bay', 'Đã hoàn thành'])
  status?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
