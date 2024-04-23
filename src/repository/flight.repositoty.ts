import { Flight } from "@/models/flight.model";
import { SeatFlight } from "@/models/seat_flight.model.";
import { BaseRepository } from "@/repository/base/base.repository";
import { IBaseRepository } from "@/repository/interface/i.base.repository";
import { IFlightRepository } from "@/repository/interface/i.flight.repository";
import { ITYPES } from "@/types/interface.types";
import { isEmpty } from "class-validator";
import e from "express";
import { inject } from "inversify";
import { DataSource, Repository } from "typeorm";

export class FlightRepository
  extends BaseRepository<Flight>
  implements IFlightRepository<Flight>
{
  private findIncludeAirportsSelect: any = {
    departureAirport: {
      airportId: true,
      airportName: true,
      city: true,
      country: true,
      airportPicture: true,
      description: true,
    },
    arrivalAirport: {
      airportId: true,
      airportName: true,
      city: true,
      country: true,
      airportPicture: true,
      description: true,
    },
    intermediateAirports: true,
  };
  private flightRepository: Repository<Flight>;
  private seatFlightsRepository: Repository<SeatFlight>;
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Flight));
    this.flightRepository = dataSource.getRepository(Flight);
    this.seatFlightsRepository = dataSource.getRepository(SeatFlight);
  }
    async _countAvailableSeatsOfFlight(flightId: number): Promise<number> {
        try {
            return await this.seatFlightsRepository.count({
                where: {
                    flightId: flightId,
                    isEmpty: true,
                },
              });
        } catch (error) {
            throw error;
        }
    }
    async _countNotEmptySeatsOfFlight(flightId: number): Promise<number> {
        try {
            return await this.seatFlightsRepository.count({
                where: {
                    flightId: flightId,
                    isEmpty: false,
                },
              });
        } catch (error) {
            throw error;
        }
    }
  async _countTotalSeatsOfFlight(flightId: number): Promise<any> {
    try {        
        return await this.seatFlightsRepository.count({
            where: {
              flightId: flightId,
            },
          });
    } catch (error) {
        throw error;
    }

  }

  async _findAllInclueAirports(params: {
    skip?: number;
    take?: number;
    where?: any;
    order?: any;
  }): Promise<any> {
    const { skip, take, where, order } = params;
    return await super._findAll({
      skip,
      take,
      where,
      order,
      relations: {
        departureAirport: true,
        arrivalAirport: true,
        intermediateAirports: true,
      },
      select: this.findIncludeAirportsSelect,
    });
  }

  async _findOneIncludeAirports(params: { where?: any }): Promise<any> {
    const { where } = params;
    console.log(where);
    
    return await super._findOne({
      where,
      relations: {
        departureAirport: true,
        arrivalAirport: true,
        intermediateAirports: true,
      },
      select: this.findIncludeAirportsSelect,
    });
  }
}
