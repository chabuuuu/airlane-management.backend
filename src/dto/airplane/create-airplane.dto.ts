// src/dto/create-airplane.dto.ts
import { MAX_TOTAL_SEATS } from '@/constants/total-seat.constants';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAirplaneDto:
 *       properties:
 *         flightId:
 *           type: string
 *           example: 125
 *         airplaneModel:
 *           maximum: 20
 *           type: string
 *           example: "Boeing 737"
 *           minLength: 1
 *         airlines:
 *           maximum: 30
 *           type: string
 *           minLength: 1
 *           example: "VIETJET"
 *       type: object
 *       required:
 *         - airplaneModel
 *         - airlines
 *     AirplaneSuccessResponse:
 *       properties:
 *         flightId:
 *           type: string
 *           example: 125
 *         airplaneModel:
 *           maximum: 20
 *           type: string
 *           example: "Boeing 737"
 *           minLength: 1
 *         airlines:
 *           maximum: 30
 *           type: string
 *           minLength: 1
 *           example: "VIETJET"
 *         airplaneId:
 *           type: string
 *           example: "fc6dcb64-a8fe-4e7c-bf8e-f9801d3b9321"
 *       type: object
 */

export class CreateAirplaneDto {
  @IsOptional()
  @IsString()
  flightId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  airplaneModel!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  airlines!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Max(MAX_TOTAL_SEATS)
  @Min(1)
  total_seat!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Max(MAX_TOTAL_SEATS)
  @Min(1)
  total_business_seat!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Max(MAX_TOTAL_SEATS)
  @Min(1)
  total_economy_seat!: number;
}