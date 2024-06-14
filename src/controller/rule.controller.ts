import { RuleID } from "@/constants/rule-id.constants";
import { BaseController } from "@/controller/base/base.controller";
import { IRuleController } from "@/controller/interface/i.rule.controller";
import { IRuleService } from "@/service/interface/i.rule.service";
import { ITYPES } from "@/types/interface.types";
import { deleteRedisKeyMatch } from "@/utils/redis/delete-key-match.util";
import { inject, injectable } from "inversify";

@injectable()
export class RuleController extends BaseController implements IRuleController<any> {
    private ruleService: IRuleService<any>;
    constructor(
        @inject(ITYPES.Service) ruleService: IRuleService<any>
    ) {
        super(ruleService);
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

    //UPDATE /rules
    async update(req: any, res: any, next: any): Promise<any> {
        try {
            if (!req.body) throw new Error("Update data is required");
            const data = req.body;
            const id = RuleID;
            const result = await this.service.update({ where: { ruleId: id }, data });
            deleteRedisKeyMatch("rules*");
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}