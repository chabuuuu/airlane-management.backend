import { IBaseService } from "@/service/interface/i.base.service";

export interface ICustomerService<T> extends IBaseService<T>{
    login(params: any): Promise<any>
}