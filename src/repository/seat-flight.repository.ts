import { SeatFlight } from "@/models/seat_flight.model.";
import { BaseRepository } from "@/repository/base/base.repository";
import { ISeatFlightRepository } from "@/repository/interface/i.seat-flightt.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class SeatFlightRepository extends BaseRepository<SeatFlight> implements ISeatFlightRepository<SeatFlight>{
    constructor(@inject(ITYPES.Datasource) dataSource : DataSource){
        super(dataSource.getRepository(SeatFlight))
    }
}