import { CreateTicketServiceDto } from "@/dto/ticket/create-ticket.dto";
import { SeatFlight } from "@/models/seat_flight.model.";
import { Ticket } from "@/models/ticket.model";
import { ITicketRepository } from "@/repository/interface/i.ticket.repository";
import { BaseService } from "@/service/base/base.service";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { ITicketService } from "@/service/interface/i.ticket.service";
import { ITYPES } from "@/types/interface.types";
import { SERVICE_TYPES } from "@/types/service.types";
import BaseError from "@/utils/error/base.error";
import { printTicketUtil } from "@/utils/report/print-ticket.util";
import { inject, injectable } from "inversify";
import moment from "moment";

@injectable()
export class TicketService
  extends BaseService
  implements ITicketService<Ticket>
{
  private seatFlightService: ISeatFlightService<SeatFlight>;
  private ticketRepository: ITicketRepository<Ticket>;
  constructor(
    @inject(ITYPES.Repository) repository: ITicketRepository<Ticket>,
    @inject(SERVICE_TYPES.SeatFlight)
    seatFlightService: ISeatFlightService<SeatFlight>
  ) {
    super(repository);
    this.seatFlightService = seatFlightService;
    this.ticketRepository = repository;
  }
  async printTicket(ticketId: string): Promise<any> {
    try {
      const ticket = await this.ticketRepository._findOne({
        where: {
          ticketId: ticketId,
        },
        relations: {
          seatFlight: true,
          flight: {
            departureAirport: true,
            arrivalAirport: true,
          },
          passenger: true,
        },
      });
      console.log("ticket: ", ticket);

      const payload = {
        code: ticket.ticketId,
        classType: ticket.seatFlight.class,
        passengerName: ticket.passenger.fullname,
        flightCode: ticket.flight.flightId.toString(),
        originCity: ticket.flight.departureAirport.city,
        destinationCity: ticket.flight.arrivalAirport.city,
        boardingHour: moment(ticket.flight.departureTime).format("HH:mm"),
        flightHour: ticket.flight.flightDuration.toString() + "H",
        seat: ticket.seatFlight.seatId,
        airlines: ticket.flight.airlines,
        price: Number(ticket.price).toString() + " VND",
        dateDeparture: moment(ticket.flight.departureTime).format("DD/MM/YYYY"),
      };
      return await printTicketUtil(payload);
    } catch (error) {
      throw error;
    }
  }
  async checkAvailableSeat(data: {
    flightId: string;
    seatId: string;
    customerId: string;
  }): Promise<Boolean> {
    try {
      const { flightId, seatId, customerId } = data;
      const seat: SeatFlight = await this.seatFlightService.findOne({
        where: {
          flightId: flightId,
          seatId: seatId,
        },
        relations: {
          booking: true,
        },
      });
      if (!seat) {
        return false;
      }
      if (seat.ticketId) {
        return false;
      }

      if (!seat.booking) {
        return true;
      }

      if (seat.booking.passengerId === customerId && !seat.ticketId) {
        return true;
      }
      return seat.isEmpty;
    } catch (error) {
      throw error;
    }
  }
  async create(payload: { data: CreateTicketServiceDto }): Promise<any> {
    try {
      let { data } = payload;
      console.log("data", data);

      if (
        !(await this.checkAvailableSeat({
          flightId: data.seatFlight.flightId,
          seatId: data.seatFlight.seatId,
          customerId: data.passengerId,
        }))
      ) {
        throw new BaseError(400, "fail", "Seat is not available");
      }
      const seatPrice = await this.seatFlightService.geSeatFinalPrice(
        data.seatFlight.flightId,
        data.seatFlight.seatId
      );

      data.price = seatPrice.finalPrice;

      //Update seatFlight
      data.seatFlight.isEmpty = false;
      console.log("final", data);

      return await this.repository._create({ data });
    } catch (error) {
      throw error;
    }
  }
}
