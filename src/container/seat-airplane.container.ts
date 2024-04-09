import { seatRepository } from "@/container/seat.container";
import { AppDataSource } from "@/database/db.datasource";
import { ISeatAirplaneRepository } from "@/repository/interface/i.seat-airplane.repository";
import { ISeatRepository } from "@/repository/interface/i.seat.repository";
import { SeatAirplaneRepository } from "@/repository/seat-airplane.repository";
import { ISeatAirplaneService } from "@/service/interface/i.seat-airplane.service";
import { SeatAirplaneService } from "@/service/seat-airplane.service";
import { ITYPES } from "@/types/interface.types";
import { REPOSITORY_TYPES } from "@/types/repository.types";
import { Container } from "inversify";

const seatAirplaneContainer = new Container();

seatAirplaneContainer.bind<ISeatAirplaneRepository<any>>(ITYPES.Repository).to(SeatAirplaneRepository);
seatAirplaneContainer.bind<ISeatAirplaneService<any>>(ITYPES.Service).to(SeatAirplaneService);
seatAirplaneContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource);

//Import
seatAirplaneContainer.bind<ISeatRepository<any>>(REPOSITORY_TYPES.Seat).toConstantValue(seatRepository);

const seatAirplaneService = seatAirplaneContainer.get<ISeatAirplaneService<any>>(ITYPES.Service);

export {seatAirplaneService}