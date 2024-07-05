import { bookingService } from "@/container/booking.container";
import { seatFlightService } from "@/container/seat-flight.container";
import { BaseController } from "@/controller/base/base.controller";
import { ITicketController } from "@/controller/interface/i.ticket.controller";
import {
  CreateTicketDto,
  CreateTicketServiceDto,
} from "@/dto/ticket/create-ticket.dto";
import { BookingStatus } from "@/enums/booking-status.enum";
import { Booking } from "@/models/booking.model";
import { SeatFlight } from "@/models/seat_flight.model.";
import { Ticket } from "@/models/ticket.model";
import { IBookingService } from "@/service/interface/i.booking.service";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { ITicketService } from "@/service/interface/i.ticket.service";
import { ITYPES } from "@/types/interface.types";
import { SERVICE_TYPES } from "@/types/service.types";
import BaseError from "@/utils/error/base.error";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";

@injectable()
export class TicketController
  extends BaseController
  implements ITicketController<Ticket>
{
  constructor(
    @inject(ITYPES.Service) service: ITicketService<Ticket>,
    @inject(SERVICE_TYPES.Booking) bookingService: IBookingService<Booking>
  ) {
    super(service);
  }

  async findAll(req: any, res: any, next: any): Promise<any> {
    try {
      let skip;
      let take;
      let { page } = req.query;
      if (page) {
        page = Number(page);
        skip = (page - 1) * 10;
        take = 10;
      }
      const totalRecords = await this.service.count();
      const result = await this.service.findAll({
        skip,
        take,
        order: {
          sellAt: "DESC",
        },
        relations: {
          seatFlight: true,
        },
      });
      res.json({
        data: result,
        dataTotal: result.length,
        page: page || 1,
        perPage: 10,
        pageTotal: Math.ceil(totalRecords / 10),
      });
    } catch (error) {
      next(error);
    }
  }

  async createAndPrintTicketByBookingId(
    req: any,
    res: any,
    next: any
  ): Promise<any> {
    try {
      if (!req.body) throw new Error("Data is required");
      const bookingId = req.params.bookingId;
      if (!bookingId)
        throw new BaseError(400, "fail", "Booking Id is required");
      const booking = await bookingService.findOne({
        where: {
          bookingId: bookingId,
        },
        relations: {
          seatFlight: true,
        },
      });
      console.log("booking", booking);

      const user = req.user;
      const userId = user.staffId;
      if (!userId) {
        throw new BaseError(400, "fail", "User Id is required");
      }

      const flightId = booking.seatFlight.flightId;
      const seatId = booking.seatFlight.seatId;
      const passengerId = booking.passengerId;
      const fullName = booking.fullName;
      const phoneNumber = booking.phoneNumber;
      const email = booking.email;
      const cccd = booking.cccd;

      let data: CreateTicketDto = {
        flightId: flightId,
        seatId: seatId,
        passengerId: passengerId,
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        cccd: cccd,
      };
      data.sellerId = userId;
      data.seatFlight = {
        seatId: data.seatId,
        flightId: data.flightId,
        isEmpty: false,
      };
      const insertData: CreateTicketServiceDto = plainToInstance(
        CreateTicketServiceDto,
        data,
        { excludeExtraneousValues: true }
      );
      console.log(insertData);

      //Create ticket
      const result = await this.service.create({ data: insertData });

      //Update booking status to "TICKET_PRINTED"
      await bookingService.update({
        where: {
          bookingId: bookingId,
        },
        data: {
          bookingStatus: BookingStatus.TICKET_PRINTED,
        },
      });

      const pathPdf = await this.service.printTicket(result.ticketId);
      var fs = require("fs");
      var file = fs.createReadStream(pathPdf);
      var stat = fs.statSync(pathPdf);
      res.setHeader("Content-Length", stat.size);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=ticket-${result.ticketId}.pdf`
      );
      file.pipe(res);
    } catch (error) {
      next(error);
    }
  }

  async printTicket(req: any, res: any, next: any): Promise<any> {
    try {
      const ticketId = req.query.ticketId;
      if (!ticketId) throw new BaseError(400, "fail", "Ticket Id is required");
      const pathPdf = await this.service.printTicket(ticketId);
      var fs = require("fs");
      var file = fs.createReadStream(pathPdf);
      var stat = fs.statSync(pathPdf);
      res.setHeader("Content-Length", stat.size);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=ticket-${ticketId}.pdf`
      );
      file.pipe(res);
    } catch (error) {
      next(error);
    }
  }

  //Manually create ticket
  async create(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.body) throw new Error("Data is required");
      const user = req.user;
      const userId = user.staffId;
      if (!userId) {
        throw new BaseError(400, "fail", "User Id is required");
      }
      const data: CreateTicketDto = req.body;
      data.sellerId = userId;
      data.seatFlight = {
        seatId: data.seatId,
        flightId: data.flightId,
        isEmpty: false,
      };

      //Set passengerId to empty because this is manual create ticket
      data.passengerId = "";
      const insertData: CreateTicketServiceDto = plainToInstance(
        CreateTicketServiceDto,
        data,
        { excludeExtraneousValues: true }
      );
      console.log(insertData);
      const result = await this.service.create({ data: insertData });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
