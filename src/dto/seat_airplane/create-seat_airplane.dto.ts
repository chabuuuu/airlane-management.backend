// src/dto/create-seat-airplane.dto.ts
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

enum SeatClass {
  Economy = 'Economy',
  Business = 'Business'
}

export class CreateSeatAirplaneDto {
  @IsString()
  @IsNotEmpty()
  seatId!: string;

  @IsString()
  @IsNotEmpty()
  airplaneId!: string;

  @IsString()
  @IsOptional()
  ticketId!: string;

  @IsEnum(SeatClass)
  @IsNotEmpty()
  class!: SeatClass;
}
