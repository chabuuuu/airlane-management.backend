import { IBaseService } from "@/service/interface/i.base.service";

export interface ISeatFlightService <T> extends IBaseService<T>{
    defaultGenerateSeatForAirplane(flightId: string): Promise<any>
    getSeatsAmountEachClass(flightId: string): Promise<any>;
    geSeatFinalPrice(flightId: number, seatId: string): Promise<number>;
}