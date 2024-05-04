import { IBaseService } from "@/service/interface/i.base.service";

export interface ISeatFlightService <T> extends IBaseService<T>{
    defaultGenerateSeatForAirplane(flightId: string): Promise<any>
    getSeatsAmountEachClass(flightId: string): Promise<any>;
}