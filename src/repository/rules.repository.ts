import { Rules } from "@/models/rules.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IRulesRepository } from "@/repository/interface/i.rules.repository";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";
import { DataSource } from "typeorm";

@injectable()
export class RulesRepository extends BaseRepository<Rules> implements IRulesRepository<Rules> {
    constructor(
        @inject(ITYPES.Datasource) dataSource: DataSource
    ) {
        super(dataSource.getRepository(Rules));
    }
}