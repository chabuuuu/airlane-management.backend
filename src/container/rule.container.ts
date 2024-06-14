import { IRuleController } from "@/controller/interface/i.rule.controller";
import { RuleController } from "@/controller/rule.controller";
import { AppDataSource } from "@/database/db.datasource";
import { IRulesRepository } from "@/repository/interface/i.rules.repository";
import { RulesRepository } from "@/repository/rules.repository";
import { IRuleService } from "@/service/interface/i.rule.service";
import { RuleService } from "@/service/rule.service";
import { ITYPES } from "@/types/interface.types";
import { Container } from "inversify";

const ruleContainer = new Container()
ruleContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource)
ruleContainer.bind<IRuleController<any>>(ITYPES.Controller).to(RuleController)
ruleContainer.bind<IRuleService<any>>(ITYPES.Service).to(RuleService)
ruleContainer.bind<IRulesRepository<any>>(ITYPES.Repository).to(RulesRepository)

const ruleController = ruleContainer.get<IRuleController<any>>(ITYPES.Controller)
const ruleService = ruleContainer.get<IRuleService<any>>(ITYPES.Service)
const ruleRepository = ruleContainer.get<IRulesRepository<any>>(ITYPES.Repository)

export {ruleController, ruleService, ruleRepository}