import { IFlightRepository } from "@/repository/interface/i.flight.repository";
import { BaseService } from "@/service/base/base.service";
import { IFlightService } from "@/service/interface/i.flight.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class FlightService extends BaseService implements IFlightService<any>{
    protected flightRepository: IFlightRepository<any>;
    constructor(@inject(ITYPES.Repository) repository: IFlightRepository<any>) {
        super(repository);
        this.flightRepository = repository;
    }
    async findAllInclueAirports(params: any): Promise<any> {
        return await this.flightRepository._findAllInclueAirports(params);
    }
    async findOneIncludeAirports(params: any): Promise<any> {
        return await this.flightRepository._findOneIncludeAirports(params);
    }
}