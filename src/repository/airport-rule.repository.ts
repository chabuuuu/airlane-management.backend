import { AirportRule } from "@/models/airport-rule.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IAirportRuleRepository } from "@/repository/interface/i.airport-rule.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class AirportRuleRepository extends BaseRepository<AirportRule> implements IAirportRuleRepository<AirportRule> {
    constructor(
        @inject(ITYPES.Datasource) dataSource: DataSource
    ){
        super(dataSource.getRepository(AirportRule))
    }
}