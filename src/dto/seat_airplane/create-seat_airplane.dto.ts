// src/dto/create-seat-airplane.dto.ts
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

enum SeatClass {
  Economy = 'Economy',
  Business = 'Business'
}

export class CreateSeatAirplaneDto {
  @IsString()
  @IsNotEmpty()
  seatId!: string;

  @IsUUID()
  airplaneId!: string;

  @IsUUID()
  ticketId!: string;

  @IsEnum(SeatClass)
  seatClass!: SeatClass;
}
