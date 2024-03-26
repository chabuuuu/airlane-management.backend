// src/dto/create-airport.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateAirportDto {
  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  airportCode!: string;

  @IsString()
  @IsNotEmpty()
  airportName!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @IsNotEmpty()
  status!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  airportPicture?: string;
}
