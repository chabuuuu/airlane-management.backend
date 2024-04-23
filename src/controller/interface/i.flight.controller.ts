import { IBaseController } from "@/controller/interface/i.base.controller";

export interface IFlightController<T> extends IBaseController<T> {
    findAvailableFlight(req: any, res: any, next: any): Promise<any>
}