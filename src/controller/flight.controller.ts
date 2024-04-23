import { BaseController } from "@/controller/base/base.controller";
import { IFlightController } from "@/controller/interface/i.flight.controller";
import { FindFlightDto } from "@/dto/flight/find-flight.dto";
import { FlightStatus } from "@/enums/flight-status.enum";
import { IFlightService } from "@/service/interface/i.flight.service";
import { ITYPES } from "@/types/interface.types";
import { classValidateUtil } from "@/utils/class-validate/class-validate.util";
import BaseError from "@/utils/error/base.error";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";

export class FlightController
  extends BaseController
  implements IFlightController<any>
{
  readonly flightService: IFlightService<any>;
  constructor(@inject(ITYPES.Service) service: IFlightService<any>) {
    super(service);
    this.flightService = service;
  }
  async findAvailableFlight(req: any, res: any, next: any): Promise<any> {
    try {
      const query : FindFlightDto = await classValidateUtil(FindFlightDto, req.query);
      console.log('query: ', query);
      
      const result = await this.flightService.findAllInclueAirports({
        where: {
          departureAirport: {
            city: query.departure
          },
          arrivalAirport: {
            city: query.arrival
          },
          departureTime: query.time
        }
      })
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: any, res: any, next: any): Promise<any> {
    try {
        if (!req.params.id) throw new Error("Id is required");
        const id = req.params.id;
        const result = await this.flightService.update({ where: { flightId: id }, data: {
          status: FlightStatus.Canceled
        }});
        res.json(result);
    } catch (error) {
        next(error);
    }
}
  async update(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      if (!req.body) throw new Error("Update data is required");
      const data = req.body;
      const id = req.params.id;
      const result = await this.service.update({
        where: { flightId: id },
        data,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async findOne(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      const id = req.params.id;
      const result = await this.flightService.findOneIncludeAirports({ where: { flightId: id } });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async findAll(req: any, res: any, next: any): Promise<any> {
    try {
      let skip;
      let take;
      const { page } = req.query;
      if (page) {
        skip = (page - 1) * 10;
        take = 10;
      }
      const result = await this.flightService.findAllInclueAirports({
        skip,
        take,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
