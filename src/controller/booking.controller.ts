import { BaseController } from "@/controller/base/base.controller";
import { IBookingController } from "@/controller/interface/i.booking.controller";
import {
  CreateBookingDto,
  CreateBookingServiceDto,
} from "@/dto/booking/create-booking.dto";
import { BookingStatus } from "@/enums/booking-status.enum";
import { Booking } from "@/models/booking.model";
import { Flight } from "@/models/flight.model";
import { IBookingService } from "@/service/interface/i.booking.service";
import { IFlightService } from "@/service/interface/i.flight.service";
import { ITYPES } from "@/types/interface.types";
import { SERVICE_TYPES } from "@/types/service.types";
import BaseError from "@/utils/error/base.error";
import { getRules } from "@/utils/utils/get-rules.util";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import moment from "moment";

@injectable()
export class BookingController
  extends BaseController
  implements IBookingController<Booking>
{
  private bookingService: IBookingService<Booking>;
  private flightService: IFlightService<Flight>;
  constructor(
    @inject(ITYPES.Service) service: IBookingService<Booking>,
    @inject(SERVICE_TYPES.Flight) flightService: IFlightService<Flight>
  ) {
    super(service);
    this.bookingService = service;
    this.flightService = flightService;
  }
  async findOne(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      const id = req.params.id;
      const result = await this.service.findOne({
        where: { bookingId: id },
        relations: {
          seatFlight: true,
        },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
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
          passengerId: userId,
        },
        relations: {
          seatFlight: true,
        },
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
      const rules = await getRules();
      const minCancelBookingTime = rules.minCancelBookingTime;
      const booking = await this.bookingService.findOne({
        where: { bookingId: id },
      });
      const departureTime = moment(
        booking.seatFlight.flight.departureTime,
        "DD-MM-YYYY HH:mm:ss"
      );
      const currentTime = moment();
      const daysDiff = departureTime.diff(currentTime, "days");
      if (daysDiff < minCancelBookingTime) {
        throw new BaseError(
          400,
          "fail",
          `Sorry, you can only cancel booking before ${minCancelBookingTime} days`
        );
      }

      await this.bookingService.update({
        where: { bookingId: id },
        data: { bookingStatus: BookingStatus.CANCELLED },
      });
      res.json({ message: "Booking is cancelled" });
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

      //Check rules
      const rules = await getRules();
      const minBookingTime = rules.minBookingTime;
      const flight = await this.flightService.findOne({
        where: { flightId: data.flightId },
      });
      const departureTime = moment(flight.departureTime, "DD-MM-YYYY HH:mm:ss");
      const currentTime = moment();
      const daysDiff = departureTime.diff(currentTime, "days");

      console.log({
        minBookingTime,
        daysDiff,
        departureTime: departureTime,
      });

      if (daysDiff < minBookingTime) {
        throw new BaseError(
          400,
          "fail",
          `Sorry, you can only book flight before ${minBookingTime} days`
        );
      }

      //Checking all seat of booking list is available
      for (let seatId of data.seatIdList) {
        if (
          !(await this.bookingService.checkAvailableSeat({
            flightId: data.flightId,
            seatId: seatId,
          }))
        ) {
          throw new BaseError(
            400,
            "fail",
            `Sorry, seat: ${seatId} is not available`
          );
        }
      }
      // Create booking for each seat
      let bookedList: Array<any> = [];
      let index = 0;
      for (let seatId of data.seatIdList) {
        data.seatFlight = {
          seatId: seatId,
          flightId: data.flightId,
        };
        data.fullName = data.fullNameList[index];
        data.phoneNumber = data.phoneNumberList[index];
        data.email = data.emailList[index];
        data.cccd = data.cccdList[index];
        index++;
        const insertData: CreateBookingServiceDto = plainToInstance(
          CreateBookingServiceDto,
          data,
          { excludeExtraneousValues: true }
        );
        let createdBooking = await this.service.create({ data: insertData });
        bookedList.push(createdBooking);
      }

      res.json({
        message: "Booking is created",
        bookedList: bookedList,
      });
    } catch (error) {
      next(error);
    }
  }
}
