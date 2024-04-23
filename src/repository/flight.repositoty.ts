import { Flight } from "@/models/flight.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IBaseRepository } from "@/repository/interface/i.base.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class FlightRepository extends BaseRepository<Flight> implements IBaseRepository<Flight>{
    
    private findIncludeAirportsSelect: any = {
        flightId: true,
        price: true,
        status: true,
        departureTime: true,
        flightDuration: true,
        description: true,
        createAt: true,
        updateAt: true,
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
        intermediateAirports: true
    }
    
    constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
        super(dataSource.getRepository(Flight))
    }

    async _findAllInclueAirports (params: {
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
            select: this.findIncludeAirportsSelect
        })
    }

    async _findOneIncludeAirports (params: {
        where?: any;
    }): Promise<any> {
        const { where } = params;
        return await super._findOne({
            where,
            relations: {
                departureAirport: true,
                arrivalAirport: true,
                intermediateAirports: true,
            },
            select: this.findIncludeAirportsSelect
        })
    }
}