import { BaseController } from "@/controller/base/base.controller";
import { ITicketClassController } from "@/controller/interface/i.ticket-class.controller";
import { TicketClass } from "@/models/ticket_class.model";
import { ITicketClassService } from "@/service/interface/i.ticket-class.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class TicketClassController extends BaseController implements ITicketClassController<TicketClass> {
    constructor(@inject(ITYPES.Service) service: ITicketClassService<TicketClass>) {
        super(service);
      }
}