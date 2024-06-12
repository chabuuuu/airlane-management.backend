import { IRuleController } from "@/controller/interface/i.rule.controller";
import { IRuleService } from "@/service/interface/i.rule.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class RuleController implements IRuleController {
    private ruleService: IRuleService<any>;
    constructor(
        @inject(ITYPES.Service) ruleService: IRuleService<any>
    ) {
        this.ruleService = ruleService;
    }

    //GET /rules
    async getRules(req: any, res: any, next: any): Promise<any> {
        try {
            const result = await this.ruleService.getRules();
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}