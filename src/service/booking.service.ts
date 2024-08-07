import { CreateBookingServiceDto } from "@/dto/booking/create-booking.dto";
import { Booking } from "@/models/booking.model";
import { SeatFlight } from "@/models/seat_flight.model.";
import { IBookingRepository } from "@/repository/interface/i.booking.repository";
import { ISeatFlightRepository } from "@/repository/interface/i.seat-flightt.repository";
import { BaseService } from "@/service/base/base.service";
import { IBookingService } from "@/service/interface/i.booking.service";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { ITYPES } from "@/types/interface.types";
import { REPOSITORY_TYPES } from "@/types/repository.types";
import { SERVICE_TYPES } from "@/types/service.types";
import BaseError from "@/utils/error/base.error";
import { deleteRedisKeyMatch } from "@/utils/redis/delete-key-match.util";
import { inject, injectable } from "inversify";

@injectable()
export class BookingService
  extends BaseService
  implements IBookingService<Booking>
{
  private bookingRepository: IBookingRepository<Booking>;
  private seatFlightService: ISeatFlightService<SeatFlight>;
  constructor(
    @inject(ITYPES.Repository) repository: IBookingRepository<Booking>,
    @inject(SERVICE_TYPES.SeatFlight)
    seatFlightService: ISeatFlightService<SeatFlight>
  ) {
    super(repository);
    this.bookingRepository = repository;
    this.seatFlightService = seatFlightService;
  }
  async checkAvailableSeat(data: {
    flightId: string;
    seatId: string;
  }): Promise<Boolean> {
    try {
      const { flightId, seatId } = data;
      const seat = await this.seatFlightService.findOne({
        where: {
          flightId: flightId,
          seatId: seatId,
        },
      });
      if (!seat) {
        return false;
      }
      return seat.isEmpty;
    } catch (error) {
      throw error;
    }
  }
  async create(payload: { data: CreateBookingServiceDto }): Promise<any> {
    try {
      let { data } = payload;
      if (
        !(await this.checkAvailableSeat({
          flightId: data.seatFlight.flightId,
          seatId: data.seatFlight.seatId,
        }))
      ) {
        throw new BaseError(400, "fail", "Seat is not available");
      }
      const seatPrice = await this.seatFlightService.geSeatFinalPrice(
        data.seatFlight.flightId,
        data.seatFlight.seatId
      );
      data.price = seatPrice.finalPrice;
      console.log(data);

      //Update seatFlight
      data.seatFlight.isEmpty = false;
      data.paymentStatus = true;
      const result = await this.bookingRepository._create({ data });
      deleteRedisKeyMatch("flight*");
      return result;
    } catch (error) {
      throw error;
    }
  }
}
