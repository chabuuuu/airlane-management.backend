// src/dto/create-booking.dto.ts
import { SeatFlight } from '@/models/seat_flight.model.';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

enum BookingStatus {
  Booked = 'Đã lấy vé',
  NotBooked = 'Chưa lấy vé',
  Cancelled = 'Hủy đặt vé'
}

export class UpdateSeatFLight {
  seatId!: string;
  flightId!: number;
  isEmpty?: boolean;
}

export class CreateBookingDto {

  passengerId!: string;
  price!: number;
  seatFlight!: UpdateSeatFLight;

  @IsNotEmpty()
  @IsString()
  seatId!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  flightId!: number;
}

export class CreateBookingServiceDto {
  @Expose()
  passengerId!: string;
  @Expose()
  price!: number;
  @Expose()
  seatFlight!: UpdateSeatFLight;
}

