import { seatFlightService } from "@/container/seat-flight.container";
import { FlightController } from "@/controller/flight.controller";
import { IFlightController } from "@/controller/interface/i.flight.controller";
import { AppDataSource } from "@/database/db.datasource";
import { SeatFlight } from "@/models/seat_flight.model.";
import { FlightRepository } from "@/repository/flight.repositoty";
import { IFlightRepository } from "@/repository/interface/i.flight.repository";
import { FlightService } from "@/service/flight.service";
import { IFlightService } from "@/service/interface/i.flight.service";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { ITYPES } from "@/types/interface.types";
import { SERVICE_TYPES } from "@/types/service.types";
import { Container } from "inversify";

const flightContainer = new Container();

flightContainer.bind<IFlightService<any>>(ITYPES.Service).to(FlightService);
flightContainer.bind<IFlightController<any>>(ITYPES.Controller).to(FlightController);
flightContainer.bind<IFlightRepository<any>>(ITYPES.Repository).to(FlightRepository);
flightContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource);

//Import service
flightContainer.bind<ISeatFlightService<SeatFlight>>(SERVICE_TYPES.SeatFlight).toConstantValue(seatFlightService);

const flightService = flightContainer.get<IFlightService<any>>(ITYPES.Service);
const flightController = flightContainer.get<IFlightController<any>>(ITYPES.Controller);

export {flightController, flightService};