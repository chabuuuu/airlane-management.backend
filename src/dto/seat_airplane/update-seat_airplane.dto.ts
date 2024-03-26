// src/dto/update-seat-airplane.dto.ts
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

enum SeatClass {
  Economy = 'Economy',
  Business = 'Business'
}

export class UpdateSeatAirplaneDto {
  @IsString()
  @IsOptional()
  seatId?: string;

  @IsUUID()
  @IsOptional()
  airplaneId?: string;

  @IsUUID()
  @IsOptional()
  ticketId?: string;

  @IsEnum(SeatClass)
  @IsOptional()
  seatClass?: SeatClass;
}
