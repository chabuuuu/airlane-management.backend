import { MAX_TOTAL_SEATS } from "@/constants/total-seat.constants";
import { Seat } from "@/models/seat.model";
import { TicketClass } from "@/models/ticket_class.model";
import { ISeatFlightRepository } from "@/repository/interface/i.seat-flightt.repository";
import { ISeatRepository } from "@/repository/interface/i.seat.repository";
import { ITicketClassRepository } from "@/repository/interface/i.ticket-class.repository";
import { BaseService } from "@/service/base/base.service";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { ITYPES } from "@/types/interface.types";
import { REPOSITORY_TYPES } from "@/types/repository.types";
import BaseError from "@/utils/error/base.error";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";

@injectable()
export class SeatFlightService
  extends BaseService
  implements ISeatFlightService<any>
{
  private seatRepository: ISeatRepository<Seat>;
  private ticketClassRepository: ITicketClassRepository<TicketClass>;
  constructor(
    @inject(ITYPES.Repository) repository: ISeatFlightRepository<any>,
    @inject(REPOSITORY_TYPES.Seat) seatRepository: ISeatRepository<Seat>,
    @inject(REPOSITORY_TYPES.TicketClass)
    ticketClassRepository: ITicketClassRepository<TicketClass>
  ) {
    super(repository);
    this.seatRepository = seatRepository;
    this.ticketClassRepository = ticketClassRepository;
  }
  async geSeatFinalPrice(
    flightId: string,
    seatId: string
  ): Promise<{
    rawPrice: number;
    finalPrice: number;
  }> {
    try {
      const seatIncludeClassAndFlight =
        await this.repository._getSeatIncludeClassAndFlight(flightId, seatId);
      if (!seatIncludeClassAndFlight) {
        throw new BaseError(StatusCodes.NOT_FOUND, "fail", "Cannot find seat");
      }
      const rawPrice = Number(seatIncludeClassAndFlight.flight.price);
      const priceBonusInterest = Number(
        seatIncludeClassAndFlight.ticketClass.priceBonusInterest
      );
      return {
        finalPrice: rawPrice + priceBonusInterest * rawPrice,
        rawPrice: rawPrice,
      };
    } catch (error) {
      throw error;
    }
  }
  async getSeatsAmountEachClass(flightId: string): Promise<any> {
    try {
      return await this.repository._getSeatsAmountEachClass(flightId);
    } catch (error) {
      throw error;
    }
  }
  async defaultGenerateSeatForAirplane(flightId: string): Promise<any> {
    try {
      const total_seat = MAX_TOTAL_SEATS;
      let defaul_class = await this.ticketClassRepository._findOne({
        where: {
          isDefaultClass: true,
        },
      });
      if (!defaul_class) {
        throw new BaseError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "fail",
          "Cannot find default class"
        );
      }
      const allSeatsId: Array<Seat> = await this.seatRepository._findAll({
        order: {
          seat_index: "ASC",
        },
      });
      console.log("lenght", allSeatsId.length);

      console.log(allSeatsId);

      for (let i = 0; i < allSeatsId.length; i++) {
        let seatId = allSeatsId[i].seatId;
        await this.repository._create({
          data: { seatId, flightId, class: defaul_class.className },
        });
      }
      console.log("Success generate seat for airplane");
      return;
    } catch (error) {
      throw error;
    }
  }
}
