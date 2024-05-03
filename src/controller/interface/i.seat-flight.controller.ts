import { IBaseController } from "@/controller/interface/i.base.controller";

export interface ISeatFlightController <T> extends IBaseController<T> {
    findAllByFlightId(req: any, res: any, next: any): Promise<any>;
    changeSeatsClass(req: any, res: any, next: any): Promise<any>;
}