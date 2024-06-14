import { IBaseService } from "@/service/interface/i.base.service";

export interface IRuleService <T> extends IBaseService<T>{
    getRules(): Promise<any>;
}