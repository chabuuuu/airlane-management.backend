// src/dto/update-ticket.dto.ts
import { Type } from 'class-transformer';
import { IsDateString, IsDecimal, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

enum TicketStatus {
  Booked = 'Booked',
  Selled = 'Selled',
  Cancelled = 'Cancelled'
}

export class UpdateTicketDto {
  @IsString()
  @IsOptional()
  flightId!: string;

  @IsString()
  @IsOptional()
  passengerId!: string;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price!: number;

  @IsString()
  @IsOptional()
  sellerId!: string;

  @IsEnum(TicketStatus)
  @IsOptional()
  status!: TicketStatus;

  @IsDateString()
  @IsOptional()
  sellAt?: string; 
}
