import { Ticket } from "@/models/ticket.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { ITicketRepository } from "@/repository/interface/i.ticket.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class TicketRepository extends BaseRepository<Ticket> implements ITicketRepository<Ticket> {
    constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
        super(dataSource.getRepository(Ticket))
    }
}