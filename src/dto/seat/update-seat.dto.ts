// src/dto/update-seat.dto.ts
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';


export class UpdateSeatDto {
  @IsString()
  @IsOptional()
  seatId?: string;
}
