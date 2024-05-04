import { SeatFlight } from "@/models/seat_flight.model.";
import { BaseRepository } from "@/repository/base/base.repository";
import { ISeatFlightRepository } from "@/repository/interface/i.seat-flightt.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource, Repository } from "typeorm";

export class SeatFlightRepository
  extends BaseRepository<SeatFlight>
  implements ISeatFlightRepository<SeatFlight>
{
  private seatFlightModel: Repository<SeatFlight>;
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(SeatFlight));
    this.seatFlightModel = dataSource.getRepository(SeatFlight);
  }
    async _getSeatIncludeClassAndFlight(flightId: number, seatId: string): Promise<any> {
        try {
            const result = await this.seatFlightModel.findOne({
                where: {
                    flightId: flightId,
                    seatId: seatId
                },
                relations: {
                    ticketClass: true,
                    flight: true,
                },
            });
            console.log(result);
            return result;
            
        } catch (error) {
            throw error;
        }
    }

  //This will return:
  /*
    [
    {
        "class": "LV1",
        "totalSeat": "3",
        "emptySeat": "2"
    },
    {
        "class": "LV2",
        "totalSeat": "45",
        "emptySeat": "45"
    }
    ]
    */
  async _getSeatsAmountEachClass(flightId: string): Promise<any> {
    try {
      const subQuery = this.seatFlightModel
        .createQueryBuilder("subQuery")
        .select("class")
        .addSelect("COUNT(isEmpty)", "emptySeat")
        .where("flightId = :flightId", { flightId })
        .andWhere("isEmpty = 1")
        .groupBy("class");

      const results = await this.seatFlightModel
        .createQueryBuilder("seat_flight")
        .select("seat_flight.class", "class")
        .addSelect("COUNT(seat_flight.class)", "totalSeat")
        .addSelect("subQuery.emptySeat", "emptySeat")
        .innerJoin(
          `(${subQuery.getQuery()})`,
          "subQuery",
          "seat_flight.class = subQuery.class"
        )
        .where("seat_flight.flightId = :flightId", { flightId })
        .groupBy("seat_flight.class")
        .getRawMany();

      return results;
    } catch (error) {
      throw error;
    }
  }
}
