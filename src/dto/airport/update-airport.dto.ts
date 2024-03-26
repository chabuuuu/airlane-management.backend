// src/dto/update-airport.dto.ts
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAirportDto {
  @IsString()
  @MaxLength(5)
  @IsOptional()
  airportCode?: string;

  @IsString()
  @IsOptional()
  airportName?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  airportPicture?: string;
}
