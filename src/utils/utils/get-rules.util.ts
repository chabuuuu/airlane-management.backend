import { RuleID } from "@/constants/rule-id.constants";
import { ruleRepository } from "@/container/rule.container";
import { Rules } from "@/models/rules.model";
import redis from "@/utils/redis/redis.instance.util";

export async function getRules () : Promise<Rules>{
    const result = await redis.get("rules:");
    console.log("result: ", result);
    
    if (result){
        return JSON.parse(result);
    }
    const rules = await ruleRepository._findOne({ where: { ruleId: RuleID } });
    redis.set("rules:", JSON.stringify(rules));
    return rules;
}