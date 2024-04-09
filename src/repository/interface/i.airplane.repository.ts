import { IBaseRepository } from "@/repository/interface/i.base.repository";

export interface IAirplaneRepository<T> extends IBaseRepository<T> {
    getSeats(airplaneId: String): Promise<any>;
}