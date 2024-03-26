// src/dto/create-airport.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsOptional, MAX, IsEnum } from 'class-validator';

export class CreateAirportDto {
  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  airportCode!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  airportName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country!: string;

  @IsOptional()
  @IsEnum(["Đang hoạt động", "Đang bảo trì", "Đang tạm dừng", "Đã dừng hoạt động"])
  status!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  airportPicture?: string;
}
