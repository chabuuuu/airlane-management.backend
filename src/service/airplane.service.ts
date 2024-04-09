import { MAX_TOTAL_SEATS } from "@/constants/total-seat.constants";
import { seatAirplaneService } from "@/container/seat-airplane.container";
import { Seat } from "@/models/seat.model";
import { IAirplaneRepository } from "@/repository/interface/i.airplane.repository";
import { ISeatRepository } from "@/repository/interface/i.seat.repository";
import { BaseService } from "@/service/base/base.service";
import { IAirplaneService } from "@/service/interface/i.airplane.service";
import { ICustomerService } from "@/service/interface/i.customer.service";
import { ISeatAirplaneService } from "@/service/interface/i.seat-airplane.service";
import { ITYPES } from "@/types/interface.types";
import { REPOSITORY_TYPES } from "@/types/repository.types";
import { SERVICE_TYPES } from "@/types/service.types";
import BaseError from "@/utils/error/base.error";
import { inject, injectable } from "inversify";

@injectable()
export class AirplaneService
  extends BaseService
  implements IAirplaneService<any>
{
  private seatAirplaneService: ISeatAirplaneService<any>;
  constructor(
    @inject(ITYPES.Repository) repository: IAirplaneRepository<any>,
    @inject(SERVICE_TYPES.SeatAirplane) seatAirplaneService: ISeatAirplaneService<any>
  ) {
    super(repository);
    this.seatAirplaneService = seatAirplaneService;
  }
  async getSeats(airplaneId: string): Promise<any> {
    try {
      return await this.repository.getSeats(airplaneId);
    } catch (error) {
      throw error;
    }
  }
  async create(data: any): Promise<any> {
    try {
      console.log('data', data);
      const createAirplaneData = data.data;
      if (createAirplaneData.airplaneId && await this.repository._exists({ where: { airplaneId: data.airplaneId } })) {
        throw new BaseError(409, 'fail', 'Airplane id already exists');
      }
      const total_seat = createAirplaneData.total_seat;
      const total_business_seat = createAirplaneData.total_business_seat;
      const total_economy_seat = createAirplaneData.total_economy_seat;
      if (total_seat !== total_business_seat + total_economy_seat) {
        throw new BaseError(400, 'fail', 'Total seat must be equal to total business seat + total economy seat');
      }
      if (total_seat > MAX_TOTAL_SEATS) {
        throw new BaseError(400, 'fail', 'Total seat must not be greater than 200');
      }
      data.data.total_economy_seat = total_economy_seat;
      data.data.total_seat = total_seat;
      data.data.total_business_seat = total_business_seat;
      const new_airplane = await this.repository._create(data);
      const airplaneId = new_airplane.airplaneId;
      await this.seatAirplaneService.generateSeatForAirplane(
        airplaneId,
        total_seat,
        total_business_seat
      );
      return new_airplane;
    } catch (error: any) {
      throw error;
    }
  }
}
