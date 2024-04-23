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
import moment from "moment";
import { And, LessThan, LessThanOrEqual, MoreThanOrEqual, Not } from "typeorm";

export class FlightController
  extends BaseController
  implements IFlightController<any>
{
  readonly flightService: IFlightService<any>;
  private numberPerPage = 10;
  constructor(@inject(ITYPES.Service) service: IFlightService<any>) {
    super(service);
    this.flightService = service;
  }
  async updateFlightOnNotStart(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      const id = req.params.id;
      const result = await this.service.update({
        where: { flightId: id },
        data: {
          status: FlightStatus.NotStarted,
        },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async updateFlightOnProcess(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      const id = req.params.id;
      const result = await this.service.update({
        where: { flightId: id },
        data: {
          status: FlightStatus.InProgress,
        },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async updateFlightOnFinish(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      const id = req.params.id;
      const result = await this.service.update({
        where: { flightId: id },
        data: {
          status: FlightStatus.Completed,
        },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async updateFlightOnCancel(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      const id = req.params.id;
      const result = await this.service.update({
        where: { flightId: id },
        data: {
          status: FlightStatus.Canceled,
        },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async findAvailableFlight(req: any, res: any, next: any): Promise<any> {
    try {
      //Validate query
      const query: FindFlightDto = await classValidateUtil(
        FindFlightDto,
        req.query
      );
      let dateQuery;
      console.log("query: ", query);

      //Pagination
      let skip;
      let take;
      let { page } = req.query;
      if (page) {
        page = Number(page);
        skip = (page - 1) * 10;
        take = 10;
      }
      const totalFlights = await this.flightService.count();

      //Create query for date
      if (query.time) {
        const day = moment(query.time).toDate();
        const dayPlusOne = moment(query.time).add(1, "days").toDate();
        console.log("day: ", day);
        console.log("dayPlusOne: ", dayPlusOne);
        dateQuery = And(MoreThanOrEqual(day), LessThan(dayPlusOne));
      }

      const result = await this.flightService.findAllInclueAirportsAndSeat({
        where: {
          departureAirport: {
            city: query.departure,
          },
          arrivalAirport: {
            city: query.arrival,
          },
          departureTime: dateQuery,
          status: FlightStatus.NotStarted,
        },
        order: {
          departureTime: "ASC",
        },
        skip,
        take
      });
      res.json({
        data: result,
        dataTotal: result.length,
        page: page || 1,
        perPage: this.numberPerPage,
        pageTotal: Math.ceil(totalFlights / this.numberPerPage),
      });
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
      const result = await this.flightService.findOneIncludeAirportsAndSeat({
        where: { flightId: id },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async findAll(req: any, res: any, next: any): Promise<any> {
    try {
      let skip 
      let take
      let {page} = req.query;
      if (page) {
          page = Number(page);
          skip = (page - 1) * this.numberPerPage;
          take = this.numberPerPage;
        }
      const totalRecords = await this.service.count();
      const result = await this.flightService.findAllInclueAirportsAndSeat({
        skip,
        take,
      });
      res.json({
        data: result,
        dataTotal: result.length,
        page: page || 1,
        perPage: this.numberPerPage,
        pageTotal: Math.ceil(totalRecords / this.numberPerPage),
      });
    } catch (error) {
      next(error);
    }
  }
}
