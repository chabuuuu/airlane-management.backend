import { SeatAirplane } from "@/models/seat_airplane.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { ISeatAirplaneRepository } from "@/repository/interface/i.seat-airplane.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class SeatAirplaneRepository extends BaseRepository<SeatAirplane> implements ISeatAirplaneRepository<SeatAirplane>{
    constructor(@inject(ITYPES.Datasource) dataSource : DataSource){
        super(dataSource.getRepository(SeatAirplane))
    }
}