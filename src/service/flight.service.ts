import { IFlightRepository } from "@/repository/interface/i.flight.repository";
import { BaseService } from "@/service/base/base.service";
import { IFlightService } from "@/service/interface/i.flight.service";
import { ITYPES } from "@/types/interface.types";
import { deleteRedisKeyMatch } from "@/utils/redis/delete-key-match.util";
import redis from "@/utils/redis/redis.instance.util";
import { inject, injectable } from "inversify";

@injectable()
export class FlightService extends BaseService implements IFlightService<any>{
    protected flightRepository: IFlightRepository<any>;
    constructor(@inject(ITYPES.Repository) repository: IFlightRepository<any>) {
        super(repository);
        this.flightRepository = repository;
    }
    async update(params: any): Promise<any> {
        const result = await this.repository._update(params);
        deleteRedisKeyMatch("flight*");
        return result;
    }
    async delete(params: any): Promise<any> {
        try {
            const result = await this.repository._delete(params);
            deleteRedisKeyMatch("flight*");
            return result;
        } catch (error) {
            throw error;
        }
    }
    async create(data: any): Promise<any> {     
        try {
            const result =  await this.repository._create(data);
            deleteRedisKeyMatch("flight*");
            return result;
        } catch (error) {
            throw error;
        }   
    }

    //Get seat {occupied/total seat} of a flight
    async getSeatInformation(flightId: number): Promise<{totalSeats: number, notEmptySeats: number}> {
        try {
            let totalSeats = await this.flightRepository._countTotalSeatsOfFlight(flightId);
            let notEmptySeats = await this.flightRepository._countNotEmptySeatsOfFlight(flightId);
            return {
                totalSeats: totalSeats,
                notEmptySeats: notEmptySeats
            }
        } catch (error) {
            throw error;
        }
    }

    //Get available seat of a flight
    async countAvailableSeatsOfFlight(flightId: number): Promise<number> {
        try {
            return await this.flightRepository._countAvailableSeatsOfFlight(flightId);
        } catch (error) {
            throw error;
        }
    }

    async findAllInclueAirportsAndSeat(params: any): Promise<any> {
        try {
            let result =  await this.flightRepository._findAllInclueAirports(params);
            for (let flight of result) {
                flight.seatsAvailable = await this.countAvailableSeatsOfFlight(result.flightId);
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
    async findOneIncludeAirportsAndSeat(params: any): Promise<any> {
        try {
            const result = await this.flightRepository._findOneIncludeAirports(params);
            result.seatsAvailable = await this.countAvailableSeatsOfFlight(result.flightId);
            return result;
        } catch (error) {
            throw error;
        }
    }
}