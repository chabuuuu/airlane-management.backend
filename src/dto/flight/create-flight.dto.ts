// src/dto/create-flight.dto.ts
import { FlightStatus } from '@/enums/flight-status.enum';
import { Type } from 'class-transformer';
import { IsDateString, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateFlightDto:
 *       properties:
 *         flightCode:
 *           minLength: 1
 *           type: string
 *           example: "VN123"
 *         departureAirportId:
 *           type: number
 *           minLength: 1
 *           example: 2258
 *         arrivalAirportId:
 *           type: number
 *           minLength: 1
 *           example: 8820
 *         departureTime:
 *           type: string
 *           format: date-time
 *           example: "2021-10-10T10:00:00.000Z"
 *         flightDuration:
 *           type: number
 *           minLength: 1
 *           example: 2.5
 *         economyPrice:
 *           type: number
 *           minLength: 1
 *           example: 20000000
 *         businessPrice:
 *           type: number
 *           minLength: 1
 *           example: 20000000
 *         status:
 *           enum:
 *             - Chưa khởi hành
 *             - Đang bay
 *             - Đã hoàn thành
 *           type: string
 *         description:
 *           type: string
 *           example: "Chuyến bay đến sân bay Nội Bài"
 *       type: object
 *       required:
 *         - flightCode
 *         - departureAirportId
 *         - arrivalAirportId
 *         - departureTime
 *         - flightDuration
 *         - economyPrice
 *         - businessPrice
 *     CreateFlightSuccessResponse:
 *       properties:
 *         flightCode:
 *           minLength: 1
 *           type: string
 *           example: "VN123"
 *         departureAirportId:
 *           type: number
 *           minLength: 1
 *           example: 2258
 *         arrivalAirportId:
 *           type: number
 *           minLength: 1
 *           example: 8820
 *         departureTime:
 *           type: string
 *           format: date-time
 *           example: "2021-10-10T10:00:00.000Z"
 *         flightDuration:
 *           type: number
 *           minLength: 1
 *           example: 2.5
 *         economyPrice:
 *           type: number
 *           minLength: 1
 *           example: 20000000
 *         businessPrice:
 *           type: number
 *           minLength: 1
 *           example: 20000000
 *         status:
 *           enum:
 *             - Chưa khởi hành
 *             - Đang bay
 *             - Đã hoàn thành
 *           type: string
 *         description:
 *           type: string
 *           example: "Chuyến bay đến sân bay Nội Bài"
 *       type: object
 */

export class CreateFlightDto {
  // @IsString()
  // @IsNotEmpty()
  // flightCode!: string;

  @IsNotEmpty()
  @IsString()
  flightId!: string;
  
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  departureAirportId!: number;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  arrivalAirportId!: number;

  @IsDateString()
  @IsNotEmpty()
  departureTime!: Date;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  flightDuration!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price!: number;

  @IsOptional()
  @IsEnum(FlightStatus)
  status?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  airlines!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

