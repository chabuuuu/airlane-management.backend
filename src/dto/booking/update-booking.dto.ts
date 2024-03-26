// src/dto/update-booking.dto.ts
import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';

enum BookingStatus {
  Booked = 'Đã lấy vé',
  NotBooked = 'Chưa lấy vé',
  Cancelled = 'Hủy đặt vé'
}

export class UpdateBookingDto {
  @IsUUID()
  @IsOptional()
  ticketID?: string;

  @IsBoolean()
  @IsOptional()
  paymentStatus?: boolean;

  @IsEnum(BookingStatus)
  @IsOptional()
  bookingStatus?: BookingStatus;
}
