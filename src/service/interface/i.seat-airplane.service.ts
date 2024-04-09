import { IBaseService } from "@/service/interface/i.base.service";

export interface ISeatAirplaneService <T> extends IBaseService<T> {
    generateSeatForAirplane(airplaneId: string, total_seats: number, total_business_seat: number): Promise<any>;
    updateSeatClass(airplaneId: string, total_seat: number, total_business_seat: number, total_economy_seat: number): Promise<any>;
}