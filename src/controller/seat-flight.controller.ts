import { BaseController } from "@/controller/base/base.controller";
import { ISeatFlightController } from "@/controller/interface/i.seat-flight.controller";
import { ChangeSeatsClassDto } from "@/dto/seat-flight/change-seats-class.dto";
import { SeatFlight } from "@/models/seat_flight.model.";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { ITYPES } from "@/types/interface.types";
import BaseError from "@/utils/error/base.error";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { In } from "typeorm";

@injectable()
export class SeatFlightController
  extends BaseController
  implements ISeatFlightController<any>
{
  private seatFlightService: ISeatFlightService<SeatFlight>;
  constructor(@inject(ITYPES.Service) service: ISeatFlightService<any>) {
    super(service);
    this.seatFlightService = service;
  }
  async defaultGenerateSeatForAirplane(req: any, res: any, next: any): Promise<any> {
    try {
      const { flightIds } = req.body;
      if (!flightIds) {
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Flight Id is required"
        );
      }
      for (let flightId of flightIds) {
        await this.seatFlightService.defaultGenerateSeatForAirplane(flightId);
      }
      res.json({ message: "Generate seat success" });
    } catch (error) {
      next(error);
    }
  }
  async getSeatDetail(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.query.flightId)
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Flight Id is required"
        );
      if (!req.query.seatId){
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Seat Id is required"
        );
      }
      const { flightId, seatId } = req.query;
      const finalPrice = (await this.seatFlightService.geSeatFinalPrice(flightId, seatId)).finalPrice;
      const rawPrice = (await this.seatFlightService.geSeatFinalPrice(flightId, seatId)).rawPrice;
      const seat = await this.seatFlightService.findOne({
        where: {
          flightId: flightId,
          seatId: seatId,
        },
        select: {
          class: true,
          isEmpty: true,
          seatId: true,
          flightId: true,
        },
      }
      )
      res.json({seat, rawPrice, finalPrice});
    } catch (error) {
      next(error);
    }
  }
  async getSeatsAmountEachClass(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.query.flightId)
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Flight Id is required"
        );
      const result = await this.service.getSeatsAmountEachClass(
        req.query.flightId
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async findAllByFlightId(req: any, res: any, next: any): Promise<any> {
    try {
      let skip;
      let take;
      let { page } = req.query;
      if (page) {
        page = Number(page);
        skip = (page - 1) * 10;
        take = 10;
      }
      if (!req.query.flightId)
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Flight Id is required"
        );
      const totalRecords = await this.service.count();
      const result = await this.service.findAll({
        skip,
        take,
        where: {
          flightId: req.query.flightId,
        },
      });
      res.json({
        data: result,
        dataTotal: result.length,
        page: page || 1,
        perPage: 10,
        pageTotal: Math.ceil(totalRecords / 10),
      });
    } catch (error) {
      next(error);
    }
  }

  async changeSeatsClass(req: any, res: any, next: any): Promise<any> {
    try {
        if (!req.body) throw new Error("Update data is required");
        let data : any = req.body;
        const seatIdList = data.seatIdList;
        const flightId = data.flightId;
        delete data.seatIdList;
        delete data.flightId;
        console.log({ where: { flightId: flightId, seatId: In(seatIdList) }, data });
        
        const result = await this.service.update({ where: { flightId: flightId, seatId: In(seatIdList) }, data });
        res.json(result);
    } catch (error) {
        next(error);
    }
}
}
