import { IntermediateAirport } from "@/models/intermediate_airport.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IIntermediateAirportRepository } from "@/repository/interface/i.intermediate-airport.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class IntermediateAirportRepository extends BaseRepository<IntermediateAirport> implements IIntermediateAirportRepository<IntermediateAirport> {
    constructor(
        @inject(ITYPES.Datasource) dataSource: DataSource
    ) {
        super(dataSource.getRepository(IntermediateAirport));
    }
}