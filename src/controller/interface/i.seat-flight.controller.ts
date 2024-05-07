import { IBaseController } from "@/controller/interface/i.base.controller";

export interface ISeatFlightController <T> extends IBaseController<T> {
    findAllByFlightId(req: any, res: any, next: any): Promise<any>;
    changeSeatsClass(req: any, res: any, next: any): Promise<any>;
    getSeatsAmountEachClass(req: any, res: any, next: any): Promise<any>;
    getSeatDetail(req: any, res: any, next: any): Promise<any>;
    defaultGenerateSeatForAirplane(req: any, res: any, next: any): Promise<any>
}