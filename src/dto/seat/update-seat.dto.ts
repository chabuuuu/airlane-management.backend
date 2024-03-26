// src/dto/update-seat.dto.ts
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

enum SeatClass {
  Economy = 'Economy',
  Business = 'Business'
}

export class UpdateSeatDto {
  @IsUUID()
  @IsOptional()
  seatId?: string;

  @IsEnum(SeatClass)
  @IsOptional()
  seatClass?: SeatClass;
}
