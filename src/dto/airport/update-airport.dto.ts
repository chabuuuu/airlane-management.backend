// src/dto/update-airport.dto.ts
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAirportDto {
  @IsString()
  @MaxLength(5)
  @IsOptional()
  airportCode!: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  airportName!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  city!: string;

  @IsString()
  @IsOptional()
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
