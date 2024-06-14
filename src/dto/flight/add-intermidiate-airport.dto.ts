import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddIntermediateAirportDto {

  @IsNotEmpty()
  @IsString()
  flightId!: string;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  airportId!: number;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  duration!: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
