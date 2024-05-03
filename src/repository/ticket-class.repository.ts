import { TicketClass } from "@/models/ticket_class.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { ITicketClassRepository } from "@/repository/interface/i.ticket-class.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class TicketClassRepository extends BaseRepository<TicketClass> implements ITicketClassRepository<TicketClass>{
    constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
        super(dataSource.getRepository(TicketClass));
    }
}