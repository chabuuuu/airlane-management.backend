import { airportRuleRepository } from "@/container/airport-rule.container";
import { bookingRuleRepository } from "@/container/booking-rule.container";
import { IRuleController } from "@/controller/interface/i.rule.controller";
import { RuleController } from "@/controller/rule.controller";
import { AppDataSource } from "@/database/db.datasource";
import { IAirportRuleRepository } from "@/repository/interface/i.airport-rule.repository";
import { IBookingRuleRepository } from "@/repository/interface/i.booking-rule.repository";
import { IRuleService } from "@/service/interface/i.rule.service";
import { RuleService } from "@/service/rule.service";
import { ITYPES } from "@/types/interface.types";
import { REPOSITORY_TYPES } from "@/types/repository.types";
import { Container } from "inversify";

const ruleContainer = new Container()
ruleContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource)
ruleContainer.bind<IRuleController>(ITYPES.Controller).to(RuleController)
ruleContainer.bind<IRuleService<any>>(ITYPES.Service).to(RuleService)

//Import repository
ruleContainer.bind<IBookingRuleRepository<any>>(REPOSITORY_TYPES.BookingRule).toConstantValue(bookingRuleRepository)
ruleContainer.bind<IAirportRuleRepository<any>>(REPOSITORY_TYPES.AirportRule).toConstantValue(airportRuleRepository)

const ruleController = ruleContainer.get<IRuleController>(ITYPES.Controller)
const ruleService = ruleContainer.get<IRuleService<any>>(ITYPES.Service)

export {ruleController, ruleService}