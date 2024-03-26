// src/dto/create-airplane.dto.ts
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAirplaneDto {
  @IsUUID()
  flightId!: string;

  @IsString()
  @IsNotEmpty()
  airplaneModel!: string;

  @IsString()
  @IsNotEmpty()
  airlines!: string;
}
