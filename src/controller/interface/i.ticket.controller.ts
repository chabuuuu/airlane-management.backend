import { IBaseController } from "@/controller/interface/i.base.controller";

export interface ITicketController<T> extends IBaseController<T> {
    printTicket(req: any, res: any, next: any): Promise<any>;
}