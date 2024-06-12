import { BookingRule } from "@/models/booking-rule.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IBookingRuleRepository } from "@/repository/interface/i.booking-rule.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class BookingRuleRepository extends BaseRepository<BookingRule> implements IBookingRuleRepository<BookingRule>{
    constructor(
        @inject(ITYPES.Datasource) dataSource: DataSource
    ){
        super(dataSource.getRepository(BookingRule))
    }
}