import { Seat } from "@/models/seat.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { ISeatRepository } from "@/repository/interface/i.seat.repository";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";
import { DataSource } from "typeorm";

@injectable()
export class SeatRepository extends BaseRepository<Seat> implements ISeatRepository<Seat>{
    constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
        super(dataSource.getRepository(Seat));
    }
}