// src/dto/create-ticket.dto.ts
import { IsDecimal, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

enum TicketStatus {
  Booked = 'Booked',
  Selled = 'Selled',
  Cancelled = 'Cancelled'
}

export class CreateTicketDto {
  @IsUUID()
  flightID!: string;

  @IsString()
  passengerId!: string;

  @IsDecimal()
  price!: number;

  @IsString()
  sellerId!: string;

  @IsEnum(TicketStatus)
  status!: TicketStatus;

  @IsString()
  sellAt?: string; // Optional because it might not be sold immediately upon creation
}
