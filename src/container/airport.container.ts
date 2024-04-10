import { AirportController } from "@/controller/airport.controller";
import { IAirportController } from "@/controller/interface/i.airport.controller";
import { AppDataSource } from "@/database/db.datasource";
import { Airport } from "@/models/airport.model";
import { AirportRepository } from "@/repository/airport.repository";
import { IAirportRepository } from "@/repository/interface/i.airport.repository";
import { AirportService } from "@/service/airport.service";
import { IAirportService } from "@/service/interface/i.airport.service";
import { ITYPES } from "@/types/interface.types";
import { Container } from "inversify";

const airportContainer = new Container();

airportContainer.bind<IAirportController<any>>(ITYPES.Controller).to(AirportController);
airportContainer.bind<IAirportRepository<Airport>>(ITYPES.Repository).to(AirportRepository);
airportContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource);
airportContainer.bind<IAirportService<any>>(ITYPES.Service).to(AirportService);

const airportService = airportContainer.get<IAirportService<any>>(ITYPES.Service);
const airportController = airportContainer.get<IAirportController<any>>(ITYPES.Controller);

export { airportService, airportController };