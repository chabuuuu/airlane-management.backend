import { RuleID } from "@/constants/rule-id.constants";
import { ruleRepository } from "@/container/rule.container";
import redis from "@/utils/redis/redis.instance.util";

export async function syncRulesToCache() {
    const rules = await ruleRepository._findOne({ where: { ruleId: RuleID } });
    console.log("Rules: ", rules);
    
    redis.set("rules:", JSON.stringify(rules));
}