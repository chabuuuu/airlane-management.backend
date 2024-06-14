import { IBaseController } from "@/controller/interface/i.base.controller";

export interface IRuleController<T> extends IBaseController<T> {
    getRules(req: any, res: any, next: any): Promise<any>;
}