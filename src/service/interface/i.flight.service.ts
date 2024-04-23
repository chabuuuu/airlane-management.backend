import { IBaseService } from "@/service/interface/i.base.service";

export interface IFlightService<T> extends IBaseService<T>{
    findAllInclueAirports(params: any): Promise<any>
    findOneIncludeAirports(params: any): Promise<any>
}