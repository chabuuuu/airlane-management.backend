// src/dto/create-seat.dto.ts
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

enum SeatClass {
  Economy = 'Economy',
  Business = 'Business'
}

export class CreateSeatDto {
  @IsUUID()
  @IsNotEmpty()
  seatId!: string;

  @IsEnum(SeatClass)
  seatClass!: SeatClass;
}
