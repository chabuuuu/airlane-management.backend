import { IBaseController } from "@/controller/interface/i.base.controller";

export interface IAirportController<T> extends IBaseController<T>{
    getCountry(req: any, res: any, next: any): Promise<any>
    getCityOfCountry(req: any, res: any, next: any): Promise<any>
    uploadPicture(req: any, res: any, next: any): Promise<any>
    getPicture(req: any, res: any, next: any): Promise<any>
}