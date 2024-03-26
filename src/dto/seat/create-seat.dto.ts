// src/dto/create-seat.dto.ts
import { IsEnum, IsNotEmpty, IsSemVer, IsString, IsUUID } from 'class-validator';

enum SeatClass {
  Economy = 'Economy',
  Business = 'Business'
}

export class CreateSeatDto {
  @IsNotEmpty()
  @IsString()
  seatId!: string;
}
