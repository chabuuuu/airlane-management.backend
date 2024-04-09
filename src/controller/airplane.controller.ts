import { BaseController } from "@/controller/base/base.controller";
import { IAirplaneController } from "@/controller/interface/i.airplane.controller";
import { IAirplaneService } from "@/service/interface/i.airplane.service";
import { ITYPES } from "@/types/interface.types";
import BaseError from "@/utils/error/base.error";
import { inject, injectable } from "inversify";

@injectable()
export class AirplaneController extends BaseController implements IAirplaneController<any>{
    constructor(@inject(ITYPES.Service) service: IAirplaneService<any>) {
        super(service);
      }
  async getSeats(req: any, res: any, next: any): Promise<any> {
    try {      
      if (!req.query.airplaneId) {
        throw new BaseError(400, 'fail', 'Airplane id is required');
      }
      res.json(await this.service.getSeats(req.query.airplaneId));
    } catch (error) {
      next(error);
    }
  }
}