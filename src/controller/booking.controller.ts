import { BaseController } from "@/controller/base/base.controller";
import { IBookingController } from "@/controller/interface/i.booking.controller";
import {
  CreateBookingDto,
  CreateBookingServiceDto,
} from "@/dto/booking/create-booking.dto";
import { BookingStatus } from "@/enums/booking-status.enum";
import { Booking } from "@/models/booking.model";
import { IBookingService } from "@/service/interface/i.booking.service";
import { ITYPES } from "@/types/interface.types";
import BaseError from "@/utils/error/base.error";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";

@injectable()
export class BookingController
  extends BaseController
  implements IBookingController<Booking>
{
    private bookingService: IBookingService<Booking>;
  constructor(@inject(ITYPES.Service) service: IBookingService<Booking>) {
    super(service);
    this.bookingService = service;
  }
  async getAllBooking(req: any, res: any, next: any): Promise<any> {
    try {
        const result = await this.bookingService.findAll({});
        res.json(result);
    } catch (error) {
        next(error);
    }
  }
  async getMyBooking(req: any, res: any, next: any): Promise<any> {
    try {
        const user = req.user;
        const userId = user.customerId;
        const result = await this.bookingService.findAll({
            where: {
                passengerId: userId
            }
        });
        res.json(result);
    } catch (error) {
        next(error);
    }
  }
  async cancelBooking(req: any, res: any, next: any): Promise<any> {
    try {
        if (!req.params.id) throw new Error("Id is required");
        const id = req.params.id;
        await this.bookingService.update({ where: { bookingId: id }, data: {bookingStatus: BookingStatus.CANCELLED} });
        res.json({message: "Booking is cancelled"});
    } catch (error) {
        next(error);
    }
  }

  async create(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.body) throw new Error("Data is required");
      const data: CreateBookingDto = req.body;
      const user = req.user;
      const userId = user.customerId;
      if (!userId) {
        throw new BaseError(400, "fail", "User Id is required");
      }
      data.passengerId = userId;
      data.seatFlight = {
        seatId: data.seatId,
        flightId: data.flightId,
      };      
      const insertData: CreateBookingServiceDto = plainToInstance(
        CreateBookingServiceDto,
        data,
        { excludeExtraneousValues: true }
      );
      const result = await this.service.create({ data: insertData });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
