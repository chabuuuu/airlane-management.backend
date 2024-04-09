import { IBaseController } from "@/controller/interface/i.base.controller";

export interface IAirplaneController<T> extends IBaseController<T> {
    getSeats(req: any, res: any, next: any): Promise<any>;
}