import { AppDataSource } from "@/database/db.datasource";
import { AirportRuleRepository } from "@/repository/airport-rule.repository";
import { IAirportRuleRepository } from "@/repository/interface/i.airport-rule.repository";
import { ITYPES } from "@/types/interface.types";
import { Container } from "inversify";

const airportRuleContainer = new Container()
airportRuleContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource)
airportRuleContainer.bind<IAirportRuleRepository<any>>(ITYPES.Repository).to(AirportRuleRepository)

const airportRuleRepository = airportRuleContainer.get<IAirportRuleRepository<any>>(ITYPES.Repository)

export { airportRuleRepository }