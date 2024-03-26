// src/dto/update-seat-airplane.dto.ts
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

enum SeatClass {
  Economy = 'Economy',
  Business = 'Business'
}

export class UpdateSeatAirplaneDto {
  @IsString()
  @IsOptional()
  seatId!: string;

  @IsString()
  @IsOptional()
  airplaneId!: string;

  @IsString()
  @IsOptional()
  ticketId!: string;

  @IsEnum(SeatClass)
  @IsOptional()
  class!: SeatClass;
}
