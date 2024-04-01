import { IBaseController } from "@/controller/interface/i.base.controller";

export interface IStaffController<T> extends IBaseController<T> {
    login(req: any, res: any, next: any): Promise<any>
    getInfoByToken(req: any, res: any, next: any): Promise<any>
}