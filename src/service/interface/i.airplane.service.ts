import { IBaseService } from "@/service/interface/i.base.service";

export interface IAirplaneService<T> extends IBaseService<T>{
    getSeats(airplaneId: string): Promise<any>;
    updateSeatClass(params: any): Promise<any>;
}