// src/dto/create-flight.dto.ts
import { Type } from 'class-transformer';
import { IsDateString, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  @IsNotEmpty()
  flightCode!: string;

  
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  departureAirportId!: string;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  arrivalAirportId!: string;

  @IsDateString()
  departureTime!: Date;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  flightDuration!: number;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  economyPrice!: number;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  businessPrice!: number;

  @IsOptional()
  @IsEnum(['Chưa khởi hành', 'Đang bay', 'Đã hoàn thành'])
  status?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
