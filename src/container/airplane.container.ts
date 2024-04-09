import { customerService } from "@/container/customer.container";
import { seatAirplaneService } from "@/container/seat-airplane.container";
import { seatRepository } from "@/container/seat.container";
import { AirplaneController } from "@/controller/airplane.controller";
import { IAirplaneController } from "@/controller/interface/i.airplane.controller";
import { AppDataSource } from "@/database/db.datasource";
import { Airplane } from "@/models/airplane.model";
import { Seat } from "@/models/seat.model";
import { AirplaneRepository } from "@/repository/airplane.repository";
import { IAirplaneRepository } from "@/repository/interface/i.airplane.repository";
import { ISeatRepository } from "@/repository/interface/i.seat.repository";
import { AirplaneService } from "@/service/airplane.service";
import { IAirplaneService } from "@/service/interface/i.airplane.service";
import { ICustomerService } from "@/service/interface/i.customer.service";
import { ISeatAirplaneService } from "@/service/interface/i.seat-airplane.service";
import { ITYPES } from "@/types/interface.types";
import { REPOSITORY_TYPES } from "@/types/repository.types";
import { SERVICE_TYPES } from "@/types/service.types";
import { Container } from "inversify";

const airplaneContainer = new Container();

airplaneContainer.bind<IAirplaneService<any>>(ITYPES.Service).to(AirplaneService);
airplaneContainer.bind<IAirplaneController<any>>(ITYPES.Controller).to(AirplaneController);
airplaneContainer.bind<IAirplaneRepository<Airplane>>(ITYPES.Repository).to(AirplaneRepository);
airplaneContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource);

//Import
airplaneContainer.bind<ISeatAirplaneService<Seat>>(SERVICE_TYPES.SeatAirplane).toConstantValue(seatAirplaneService);

const airplaneService = airplaneContainer.get<IAirplaneService<any>>(ITYPES.Service);
const airplaneController = airplaneContainer.get<IAirplaneController<any>>(ITYPES.Controller);


export {airplaneService, airplaneController}