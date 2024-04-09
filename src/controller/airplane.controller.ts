import { BaseController } from "@/controller/base/base.controller";
import { IAirplaneController } from "@/controller/interface/i.airplane.controller";
import { IAirplaneService } from "@/service/interface/i.airplane.service";
import { ITYPES } from "@/types/interface.types";
import BaseError from "@/utils/error/base.error";
import { inject, injectable } from "inversify";

@injectable()
export class AirplaneController
  extends BaseController
  implements IAirplaneController<any>
{
  constructor(@inject(ITYPES.Service) service: IAirplaneService<any>) {
    super(service);
  }
  async update(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      if (!req.body) throw new Error("Update data is required");
      const data = req.body;
      const id = req.params.id;
      const result = await this.service.update({
        where: { airplaneId: id },
        data,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      const id = req.params.id;
      const result = await this.service.delete({ where: { airplaneId: id } });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateSeatClass(req: any, res: any, next: any): Promise<any> {
    try {
      const result = await this.service.updateSeatClass(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async getSeats(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.query.airplaneId) {
        throw new BaseError(400, "fail", "Airplane id is required");
      }
      res.json(await this.service.getSeats(req.query.airplaneId));
    } catch (error) {
      next(error);
    }
  }
}
