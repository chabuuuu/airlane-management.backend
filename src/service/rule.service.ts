import { AirportRuleID, BookingRuleID } from "@/constants/rule-id.constants";
import { AirportRule } from "@/models/airport-rule.model";
import { BookingRule } from "@/models/booking-rule.model";
import { IAirportRuleRepository } from "@/repository/interface/i.airport-rule.repository";
import { IBookingRuleRepository } from "@/repository/interface/i.booking-rule.repository";
import { IRuleService } from "@/service/interface/i.rule.service";
import { REPOSITORY_TYPES } from "@/types/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export class RuleService implements IRuleService<any> {
    private airportRuleRepository: IAirportRuleRepository<AirportRule>;
    private bookingRuleRepository: IBookingRuleRepository<BookingRule>;
    constructor(
        @inject(REPOSITORY_TYPES.AirportRule) airportRuleRepository: IAirportRuleRepository<any>,
        @inject(REPOSITORY_TYPES.BookingRule) bookingRuleRepository: IBookingRuleRepository<any>,
    ){
        this.airportRuleRepository = airportRuleRepository;
        this.bookingRuleRepository = bookingRuleRepository;
    }
    async getRules(): Promise<any> {
        try {
            let result : any = {
                airportRules: await this.airportRuleRepository._findOne({where: {airportRuleId: AirportRuleID}}),
                bookingRules: await this.bookingRuleRepository._findOne({where: {bookingRuleId: BookingRuleID}})
            }
            delete result.airportRules.airportRuleId;
            delete result.bookingRules.bookingRuleId;
            return result;
        } catch (error) {
            throw error;
        }
    }

    
}