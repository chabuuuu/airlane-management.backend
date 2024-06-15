import { RuleID } from "@/constants/rule-id.constants";
import { MAX_TOTAL_SEATS } from "@/constants/total-seat.constants";
import { seatFlightService } from "@/container/seat-flight.container";
import { IntermediateAirport } from "@/models/intermediate_airport.model";
import { Rules } from "@/models/rules.model";
import { SeatFlight } from "@/models/seat_flight.model.";
import { IFlightRepository } from "@/repository/interface/i.flight.repository";
import { IIntermediateAirportRepository } from "@/repository/interface/i.intermediate-airport.repository";
import { IRulesRepository } from "@/repository/interface/i.rules.repository";
import { BaseService } from "@/service/base/base.service";
import { IFlightService } from "@/service/interface/i.flight.service";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { ITYPES } from "@/types/interface.types";
import { REPOSITORY_TYPES } from "@/types/repository.types";
import { SERVICE_TYPES } from "@/types/service.types";
import BaseError from "@/utils/error/base.error";
import { deleteRedisKeyMatch } from "@/utils/redis/delete-key-match.util";
import redis from "@/utils/redis/redis.instance.util";
import { inject, injectable } from "inversify";

@injectable()
export class FlightService extends BaseService implements IFlightService<any>{
    protected flightRepository: IFlightRepository<any>;
    private seatFlightService: ISeatFlightService<SeatFlight>;
    private intermediateAirportRepository: IIntermediateAirportRepository<IntermediateAirport>;
    private rulesRepository: IRulesRepository<Rules>;
    constructor(
        @inject(ITYPES.Repository) repository: IFlightRepository<any>,
        @inject(SERVICE_TYPES.SeatFlight) seatFlightService: ISeatFlightService<SeatFlight>,
        @inject(REPOSITORY_TYPES.Rules) rulesRepository: IRulesRepository<Rules>,
        @inject(REPOSITORY_TYPES.IntermediateAirport) intermediateAirportRepository: IIntermediateAirportRepository<IntermediateAirport>
    ) {
        super(repository);
        this.flightRepository = repository;
        this.seatFlightService = seatFlightService;
        this.rulesRepository = rulesRepository;
        this.intermediateAirportRepository = intermediateAirportRepository;
    }
    async softDeleteFlight(flightId: string): Promise<any> {
        try {
            return await this.flightRepository._softDeleteFlight(flightId);
        } catch (error) {
            throw error;
        }
    }
    async addIntermediateAirport(params: any): Promise<any> {
        try {
            const {data} = params;
            const duplicateIntermediateAirport = await this.intermediateAirportRepository._exists({
                where: {
                    flightId: data.flightId,
                    airportId: data.airportId
                }
            })

            if (duplicateIntermediateAirport) {
                throw new BaseError(400, "fail", "Intermediate airport already exists")
            }
            return await this.intermediateAirportRepository._create(params);
        } catch (error) {
            throw error;
        }
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
            const flightId = result.flightId;
            await this.seatFlightService.defaultGenerateSeatForAirplane(flightId);
            return result;
        } catch (error) {
            throw error;
        }   
    }

    //Get seat {occupied/total seat} of a flight
    async getSeatInformation(flightId: string): Promise<{totalSeats: number, notEmptySeats: number}> {
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
    async countAvailableSeatsOfFlight(flightId: string): Promise<number> {
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
                flight.seatsAvailable = await this.countAvailableSeatsOfFlight(flight.flightId);
                flight.seatsTotal = MAX_TOTAL_SEATS;
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
            result.seatsTotal = MAX_TOTAL_SEATS;
            return result;
        } catch (error) {
            throw error;
        }
    }
}