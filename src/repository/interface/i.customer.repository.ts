import { IBaseRepository } from "@/repository/interface/i.base.repository";

export interface ICustomerRepository<T> extends IBaseRepository<T>{
    checkUnique(params: any): Promise<any>
}