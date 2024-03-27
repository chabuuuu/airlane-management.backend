import { IBaseController } from "@/controller/interface/i.base.controller";

export interface ICustomerController<T> extends IBaseController<T>{
    login(req: any, res: any, next: any): Promise<any>
}