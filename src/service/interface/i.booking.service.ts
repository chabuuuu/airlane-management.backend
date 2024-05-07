import { CreateBookingServiceDto } from "@/dto/booking/create-booking.dto";
import { IBaseService } from "@/service/interface/i.base.service";

export interface IBookingService<T> extends IBaseService<T> {
    create(data: {data: CreateBookingServiceDto}): Promise<T>;
    checkAvailableSeat(data: {flightId: number, seatId: string}): Promise<Boolean>;
}