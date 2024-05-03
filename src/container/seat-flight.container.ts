import { seatRepository } from "@/container/seat.container";
import { ticketClassRepository } from "@/container/ticket-class.container";
import { ISeatFlightController } from "@/controller/interface/i.seat-flight.controller";
import { SeatFlightController } from "@/controller/seat-flight.controller";
import { AppDataSource } from "@/database/db.datasource";
import { Seat } from "@/models/seat.model";
import { SeatFlight } from "@/models/seat_flight.model.";
import { TicketClass } from "@/models/ticket_class.model";
import { ISeatFlightRepository } from "@/repository/interface/i.seat-flightt.repository";
import { ISeatRepository } from "@/repository/interface/i.seat.repository";
import { ITicketClassRepository } from "@/repository/interface/i.ticket-class.repository";
import { SeatFlightRepository } from "@/repository/seat-flight.repository";
import { SeatRepository } from "@/repository/seat.repository";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { SeatFlightService } from "@/service/seat-flight.service";
import { ITYPES } from "@/types/interface.types";
import { REPOSITORY_TYPES } from "@/types/repository.types";
import { Container } from "inversify";

const seatFlightContainer = new Container();

seatFlightContainer.bind<ISeatFlightController<any>>(ITYPES.Controller).to(SeatFlightController);
seatFlightContainer.bind<ISeatFlightRepository<SeatFlight>>(ITYPES.Repository).to(SeatFlightRepository);
seatFlightContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource);
seatFlightContainer.bind<ISeatFlightService<any>>(ITYPES.Service).to(SeatFlightService);

//Import repository
seatFlightContainer.bind<ISeatRepository<Seat>>(REPOSITORY_TYPES.Seat).toConstantValue(seatRepository);
seatFlightContainer.bind<ITicketClassRepository<TicketClass>>(REPOSITORY_TYPES.TicketClass).toConstantValue(ticketClassRepository);

const seatFlightController = seatFlightContainer.get<ISeatFlightController<any>>(ITYPES.Controller);
const seatFlightService = seatFlightContainer.get<ISeatFlightService<any>>(ITYPES.Service);

export { seatFlightController, seatFlightService };