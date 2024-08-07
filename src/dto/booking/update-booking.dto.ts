// src/dto/update-booking.dto.ts
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

enum BookingStatus {
  Booked = 'Đã lấy vé',
  NotBooked = 'Chưa lấy vé',
  Cancelled = 'Hủy đặt vé'
}

export class UpdateBookingDto {
  @IsNotEmpty()
  @IsString()
  ticketID!: string;

  @IsBoolean()
  @IsOptional()
  paymentStatus!: boolean;

  @IsEnum(BookingStatus)
  @IsOptional()
  bookingStatus!: BookingStatus;
}
