import { seatFlightService } from "@/container/seat-flight.container";
import { BaseController } from "@/controller/base/base.controller";
import { ITicketController } from "@/controller/interface/i.ticket.controller";
import { CreateTicketDto, CreateTicketServiceDto } from "@/dto/ticket/create-ticket.dto";
import { SeatFlight } from "@/models/seat_flight.model.";
import { Ticket } from "@/models/ticket.model";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { ITicketService } from "@/service/interface/i.ticket.service";
import { ITYPES } from "@/types/interface.types";
import { SERVICE_TYPES } from "@/types/service.types";
import BaseError from "@/utils/error/base.error";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";

@injectable()
export class TicketController extends BaseController implements ITicketController<Ticket>{
    constructor(
        @inject(ITYPES.Service) service: ITicketService<Ticket>,
    ) {
        super(service);
      }
    async printTicket(req: any, res: any, next: any): Promise<any> {
        try {
            const ticketId = req.query.ticketId;
            if (!ticketId) throw new BaseError(400, "fail", "Ticket Id is required");
            const pathPdf = await this.service.printTicket(ticketId);
            var fs = require('fs');
            var file = fs.createReadStream(pathPdf);
            var stat = fs.statSync(pathPdf);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=ticket-${ticketId}.pdf`);
            file.pipe(res);
        } catch (error) {
            next(error);
        }
    }

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
              isEmpty: false
            };   
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