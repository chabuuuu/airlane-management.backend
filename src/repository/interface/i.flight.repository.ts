import { IBaseRepository } from "@/repository/interface/i.base.repository";

export interface IFlightRepository<T> extends IBaseRepository<T> {
    _findAllInclueAirports(params: any): Promise<any>
    _findOneIncludeAirports(params: any): Promise<any>
}