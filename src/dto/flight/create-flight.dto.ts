// src/dto/create-flight.dto.ts
import { Type } from 'class-transformer';
import { IsDateString, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  flightCode!: string;

  
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
  economyPrice!: number;


  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  businessPrice!: number;

  @IsOptional()
  @IsEnum(['Chưa khởi hành', 'Đang bay', 'Đã hoàn thành'])
  status?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

