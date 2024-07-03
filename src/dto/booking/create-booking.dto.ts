// src/dto/create-booking.dto.ts
import { SeatFlight } from "@/models/seat_flight.model.";
import { Expose, Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

enum BookingStatus {
  Booked = "Đã lấy vé",
  NotBooked = "Chưa lấy vé",
  Cancelled = "Hủy đặt vé",
}

export class UpdateSeatFLight {
  seatId!: string;
  flightId!: string;
  isEmpty?: boolean;
}

export class CreateBookingDto {
  passengerId!: string;
  price!: number;
  seatFlight!: UpdateSeatFLight;

  // @IsNotEmpty()
  // @IsString()
  // seatId!: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsNotEmpty()
  seatIdList!: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsNotEmpty()
  full_nameList!: string[];

  @IsNotEmpty()
  @IsString()
  flightId!: string;
}

export class CreateBookingServiceDto {
  @Expose()
  passengerId!: string;
  @Expose()
  price!: number;
  @Expose()
  seatFlight!: UpdateSeatFLight;

  paymentStatus?: boolean;
}
