import { IBaseRepository } from "@/repository/interface/i.base.repository";

export interface ISeatFlightRepository<T> extends IBaseRepository<T> {
    _getSeatsAmountEachClass(flightId: string): Promise<any>;
    _getSeatIncludeClassAndFlight(flightId: string, seatId: string): Promise<any>;
}