import { IBaseController } from "@/controller/interface/i.base.controller";

export interface IBookingController<T> extends IBaseController<T> {
    getAllBooking(req: any, res: any, next: any): Promise<any>;
    getMyBooking(req: any, res: any, next: any): Promise<any>;
    cancelBooking(req: any, res: any, next: any): Promise<any>;
}