import { IBaseService } from "@/service/interface/i.base.service";

export interface IFlightService<T> extends IBaseService<T>{
    findAllInclueAirportsAndSeat(params: any): Promise<any>
    findOneIncludeAirportsAndSeat(params: any): Promise<any>
    getSeatInformation(flightId: string): Promise<{totalSeats: number, notEmptySeats: number}> 
    countAvailableSeatsOfFlight(flightId: string): Promise<number>
}