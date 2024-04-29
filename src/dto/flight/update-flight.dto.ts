// src/dto/update-flight.dto.ts
import { FlightStatus } from '@/enums/flight-status.enum';
import { Type } from 'class-transformer';
import { IsDateString, IsDecimal, IsEnum, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateFlightDto:
 *       properties:
 *         flightCode:
 *           type: string
 *           example: "VN123"
 *         departureAirportId:
 *           type: number
 *           example: 2258
 *         arrivalAirportId:
 *           type: number
 *           example: 8820
 *         departureTime:
 *           type: string
 *           example: "2021-10-10T10:00:00.000Z"
 *         flightDuration:
 *           type: number
 *           example: 2.5
 *         economyPrice:
 *           type: number
 *           example: 29000000
 *         businessPrice:
 *           type: number
 *           example: 90000000
 *         status:
 *           enum:
 *             - Chưa khởi hành
 *             - Đang bay
 *             - Đã hoàn thành
 *           type: string
 *           example: "Đang bay"
 *         description:
 *           type: string
 *           example: "Chuyến bay đến sân bay Nội Bài"
 *       type: object
 *     UpdateFlightSuccessResponse:
 *       properties:
 *         flightCode:
 *           type: string
 *           example: "VN123"
 *         departureAirportId:
 *           type: number
 *           example: 2258
 *         arrivalAirportId:
 *           type: number
 *           example: 8820
 *         departureTime:
 *           type: string
 *           example: "2021-10-10T10:00:00.000Z"
 *         flightDuration:
 *           type: number
 *           example: 2.5
 *         economyPrice:
 *           type: number
 *           example: 29000000
 *         businessPrice:
 *           type: number
 *           example: 90000000
 *         status:
 *           enum:
 *             - Chưa khởi hành
 *             - Đang bay
 *             - Đã hoàn thành
 *           type: string
 *           example: "Đang bay"
 *         description:
 *           type: string
 *           example: "Chuyến bay đến sân bay Nội Bài"
 *       type: object
 *     DeleteFlightSuccessResponse:
 *       properties:
 *         flightCode:
 *           type: string
 *           example: "VN123"
 *         departureAirportId:
 *           type: number
 *           example: 2258
 *         arrivalAirportId:
 *           type: number
 *           example: 8820
 *         departureTime:
 *           type: string
 *           example: "2021-10-10T10:00:00.000Z"
 *         flightDuration:
 *           type: number
 *           example: 2.5
 *         economyPrice:
 *           type: number
 *           example: 29000000
 *         businessPrice:
 *           type: number
 *           example: 90000000
 *         status:
 *           enum:
 *             - Chưa khởi hành
 *             - Đang bay
 *             - Đã hoàn thành
 *           type: string
 *           example: "Đang bay"
 *         description:
 *           type: string
 *           example: "Chuyến bay đến sân bay Nội Bài"
 *       type: object
 *     GetOneFlightSuccessResponse:
 *       properties:
 *         flightCode:
 *           type: string
 *           example: "VN123"
 *         departureAirportId:
 *           type: number
 *           example: 2258
 *         arrivalAirportId:
 *           type: number
 *           example: 8820
 *         departureTime:
 *           type: string
 *           example: "2021-10-10T10:00:00.000Z"
 *         flightDuration:
 *           type: number
 *           example: 2.5
 *         economyPrice:
 *           type: number
 *           example: 29000000
 *         businessPrice:
 *           type: number
 *           example: 90000000
 *         status:
 *           enum:
 *             - Chưa khởi hành
 *             - Đang bay
 *             - Đã hoàn thành
 *           type: string
 *           example: "Đang bay"
 *         description:
 *           type: string
 *           example: "Chuyến bay đến sân bay Nội Bài"
 *       type: object
 */

export class UpdateFlightDto {

  
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  departureAirportId?: string;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  arrivalAirportId?: string;

  @IsDateString()
  @IsOptional()
  departureTime?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  airlines!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  flightDuration?: number;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsEnum(FlightStatus)
  status?: string;

  @IsOptional()
  @IsString()
  description?: string;
}