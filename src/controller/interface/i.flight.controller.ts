import { IBaseController } from "@/controller/interface/i.base.controller";

export interface IFlightController<T> extends IBaseController<T> {
    softDeleteFlight(req: any, res: any, next: any): Promise<any>
    findAvailableFlight(req: any, res: any, next: any): Promise<any>
    updateFlightOnProcess(req: any, res: any, next: any): Promise<any>
    updateFlightOnFinish(req: any, res: any, next: any): Promise<any>
    updateFlightOnCancel(req: any, res: any, next: any): Promise<any>
    updateFlightOnNotStart(req: any, res: any, next: any): Promise<any>
    addIntermediateAirport(req: any, res: any, next: any): Promise<any>
}