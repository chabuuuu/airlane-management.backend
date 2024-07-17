import { IBaseController } from "@/controller/interface/i.base.controller";
import { Request } from "express";

export interface IBookingController<T> extends IBaseController<T> {
  getAllBooking(req: any, res: any, next: any): Promise<any>;
  getMyBooking(req: any, res: any, next: any): Promise<any>;
  cancelBooking(req: any, res: any, next: any): Promise<any>;
  checkBooking(
    req: Request<null, null, null, { flightId: string }>,
    res: any,
    next: any
  ): Promise<any>;
}
