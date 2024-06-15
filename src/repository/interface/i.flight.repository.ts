import { IBaseRepository } from "@/repository/interface/i.base.repository";

export interface IFlightRepository<T> extends IBaseRepository<T> {
    _findAllInclueAirports(params: any): Promise<any>
    _findOneIncludeAirports(params: any): Promise<any>
    _countTotalSeatsOfFlight(flightId: string): Promise<number>
    _countNotEmptySeatsOfFlight(flightId: string): Promise<number>
    _countAvailableSeatsOfFlight(flightId: string): Promise<number>
    _softDeleteFlight(flightId: string): Promise<any>
}