// src/dto/create-booking.dto.ts
import { IsBoolean, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

enum BookingStatus {
  Booked = 'Đã lấy vé',
  NotBooked = 'Chưa lấy vé',
  Cancelled = 'Hủy đặt vé'
}

export class CreateBookingDto {
  @IsUUID()
  ticketID!: string;

  @IsBoolean()
  paymentStatus!: boolean;

  @IsEnum(BookingStatus)
  bookingStatus!: BookingStatus;
}
