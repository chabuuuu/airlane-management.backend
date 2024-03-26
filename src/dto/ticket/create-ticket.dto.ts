// src/dto/create-ticket.dto.ts
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

enum TicketStatus {
  Booked = 'Booked',
  Selled = 'Selled',
  Cancelled = 'Cancelled'
}

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  flightID!: string;

  @IsString()
  @IsNotEmpty()
  passengerId!: string;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price!: number;

  @IsString()
  @IsNotEmpty()
  sellerId!: string;

  @IsEnum(TicketStatus)
  @IsNotEmpty()
  status!: TicketStatus;

  @IsDateString()
  @IsOptional()
  sellAt?: string; // Optional because it might not be sold immediately upon creation
}
