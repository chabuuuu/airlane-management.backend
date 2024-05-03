import { TicketClass } from "@/models/ticket_class.model";
import { ITicketClassRepository } from "@/repository/interface/i.ticket-class.repository";
import { BaseService } from "@/service/base/base.service";
import { ITicketClassService } from "@/service/interface/i.ticket-class.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class TicketClassService extends BaseService implements ITicketClassService<TicketClass>{
    constructor(@inject(ITYPES.Repository) repository: ITicketClassRepository<TicketClass>) {
        super(repository);
      }
}