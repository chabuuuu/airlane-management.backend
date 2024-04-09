import { Airplane } from "@/models/airplane.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IAirplaneRepository } from "@/repository/interface/i.airplane.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class AirplaneRepository extends BaseRepository<Airplane> implements IAirplaneRepository<Airplane>{
    constructor(@inject(ITYPES.Datasource) dataSource : DataSource){
        super(dataSource.getRepository(Airplane))
    }
    async getSeats(airplaneId: String): Promise<any> {
        try {
            const result = await this._model.findOne(
                {
                    where: {
                        airplaneId: airplaneId
                    },
                    select: {
                        airplaneId: true,
                        flightId: true,
                        airplaneModel: true,
                        airlines: true,
                        total_seat: true,
                        total_business_seat: true,
                        total_economy_seat: true,
                        seatAirplanes: {
                            seatId: true,
                            ticketId: true,
                            class: true,
                            isAvailable: true,
                            seat: {
                                seat_index: true,
                            },
                        }
                    },
                    relations: {
                        seatAirplanes: {
                            seat: true,
                        },
                    },
                    order: {
                        seatAirplanes: {
                            seat: {
                                seat_index: 'ASC'
                            }
                        }
                    }
                }
            )
            return result;
        } catch (error) {
            throw error;
        }
    }
}