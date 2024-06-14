import { RuleID } from "@/constants/rule-id.constants";
import { Rules } from "@/models/rules.model";
import { IRulesRepository } from "@/repository/interface/i.rules.repository";
import { BaseService } from "@/service/base/base.service";
import { IRuleService } from "@/service/interface/i.rule.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class RuleService extends BaseService implements IRuleService<any> {
    private rulesRepository: IRulesRepository<Rules>;
    constructor(
        @inject(ITYPES.Repository) rulesRepository: IRulesRepository<Rules>,
    ){
        super(rulesRepository);
        this.rulesRepository = rulesRepository;
    }
    async getRules(): Promise<any> {
        try {
            let rules = await this.rulesRepository._findOne({
                where: {
                    ruleId: RuleID
                }
            });
            let result : any = {
                airportRules: {
                    minFlightDuration: rules.minFlightDuration,
                    maxIntermediateAirport: rules.maxIntermediateAirport,
                    minIntermediateAirportStopDelay: rules.minIntermediateAirportStopDelay,
                    maxIntermediateAirportStopDelay: rules.maxIntermediateAirportStopDelay
                },
                bookingRules: {
                    minBookingTime: rules.minBookingTime,
                    minCancelBookingTime: rules.minCancelBookingTime,
                }
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    
}