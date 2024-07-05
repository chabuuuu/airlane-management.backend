// src/dto/create-ticket.dto.ts
import { UpdateSeatFLight } from "@/dto/booking/create-booking.dto";
import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTicketDto:
 *       properties:
 *         flightId:
 *           example: "VN123"
 *           minLength: 1
 *           type: string
 *         passengerId:
 *           minLength: 1
 *           example: "ceasdsa-dcxzcx21312"
 *           type: string
 *         price:
 *           example: 1000000
 *           type: string
 *           minLength: 1
 *         sellerId:
 *           example: "ceasdsa-kwtsadas"
 *           minLength: 1
 *           type: string
 *         status:
 *           example: "Booked"
 *           minLength: 1
 *           type: string
 *           enum:
 *             - Booked
 *             - Selled
 *             - Cancelled
 *         sellAt:
 *           example: "2021-09-01T00:00:00.000Z"
 *           type: string
 *       type: object
 *       required:
 *         - flightID
 *         - passengerId
 *         - price
 *         - sellerId
 *         - status
 *
 *     UpdateTicketDto:
 *       properties:
 *         flightId:
 *           type: string
 *         passengerId:
 *           type: string
 *         price:
 *           type: number
 *         sellerId:
 *           type: string
 *         status:
 *           example: "Selled"
 *           enum:
 *             - Booked
 *             - Selled
 *             - Cancelled
 *           type: string
 *         sellAt:
 *           type: string
 *       type: object
 *
 *     GetTicketById:
 *       properties:
 *         flightId:
 *           example: "VN123"
 *           minLength: 1
 *           type: string
 *         passengerId:
 *           minLength: 1
 *           example: "ceasdsa-dcxzcx21312"
 *           type: string
 *         price:
 *           example: 1000000
 *           type: string
 *           minLength: 1
 *         sellerId:
 *           example: "ceasdsa-kwtsadas"
 *           minLength: 1
 *           type: string
 *         status:
 *           example: "Booked"
 *           minLength: 1
 *           type: string
 *           enum:
 *             - Booked
 *             - Selled
 *             - Cancelled
 *         sellAt:
 *           example: "2021-09-01T00:00:00.000Z"
 *           type: string
 *       type: object
 *       required:
 *         - flightID
 *         - passengerId
 *         - price
 *         - sellerId
 *         - status
 */

enum TicketStatus {
  Booked = "Booked",
  Selled = "Selled",
  Cancelled = "Cancelled",
}

export class UpdateTicketSeatFLight {
  seatId!: string;
  flightId!: string;
  isEmpty?: boolean;
}

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  flightId!: string;

  @IsNotEmpty()
  @IsString()
  seatId!: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  cccd?: string;

  seatFlight?: UpdateTicketSeatFLight;

  passengerId?: string;

  sellerId?: string;

  @IsDateString()
  @IsOptional()
  sellAt?: string; // Optional because it might not be sold immediately upon creation
}

export class CreateTicketServiceDto {
  @Expose()
  flightId!: string;
  @Expose()
  passengerId!: string;
  @Expose()
  price!: number;
  @Expose()
  sellerId!: string;
  @Expose()
  sellAt?: Date;
  @Expose()
  fullName?: string;
  @Expose()
  email?: string;
  @Expose()
  phoneNumber?: string;
  @Expose()
  cccd?: string;
  @Expose()
  seatFlight!: UpdateTicketSeatFLight;
}
