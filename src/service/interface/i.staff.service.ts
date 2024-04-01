import { IBaseService } from "@/service/interface/i.base.service";

export interface IStaffService<T> extends IBaseService<T>{
    login(username: string, password: string): Promise<any>
    findOneIncludePassword(params: any): Promise<any>
}