// src/dto/update-ticket.dto.ts
import { IsDecimal, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

enum TicketStatus {
  Booked = 'Booked',
  Selled = 'Selled',
  Cancelled = 'Cancelled'
}

export class UpdateTicketDto {
  @IsUUID()
  @IsOptional()
  flightID?: string;

  @IsString()
  @IsOptional()
  passengerId?: string;

  @IsDecimal()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  sellerId?: string;

  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @IsString()
  @IsOptional()
  sellAt?: string;
}
