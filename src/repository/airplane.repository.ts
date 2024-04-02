import { Airplane } from "@/models/airplane.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IAirplaneRepository } from "@/repository/interface/i.airplane.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class AirplaneRepository extends BaseRepository<Airplane> implements IAirplaneRepository<Airplane>{
    constructor(@inject(ITYPES.Datasource) dataSource : DataSource){
        super(dataSource.getRepository(Airplane))
    }
}