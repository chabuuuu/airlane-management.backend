// src/dto/create-airplane.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsUUID, Max } from 'class-validator';

export class CreateAirplaneDto {
  @IsOptional()
  @IsString()
  flightId!: string;

  @IsString()
  @IsNotEmpty()
  @Max(20)
  airplaneModel!: string;

  @IsString()
  @IsNotEmpty()
  @Max(30)
  airlines!: string;
}
