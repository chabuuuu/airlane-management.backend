import { seatFlightService } from "@/container/seat-flight.container";
import { ITicketController } from "@/controller/interface/i.ticket.controller";
import { TicketController } from "@/controller/ticket.controller";
import { AppDataSource } from "@/database/db.datasource";
import { SeatFlight } from "@/models/seat_flight.model.";
import { Ticket } from "@/models/ticket.model";
import { ITicketRepository } from "@/repository/interface/i.ticket.repository";
import { TicketRepository } from "@/repository/ticket.repository";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { ITicketService } from "@/service/interface/i.ticket.service";
import { TicketService } from "@/service/ticket.service";
import { ITYPES } from "@/types/interface.types";
import { SERVICE_TYPES } from "@/types/service.types";
import { Container } from "inversify";

const ticketContainer = new Container();

ticketContainer.bind<ITicketService<Ticket>>(ITYPES.Service).to(TicketService);
ticketContainer.bind<ITicketController<Ticket>>(ITYPES.Controller).to(TicketController);
ticketContainer.bind<ITicketRepository<Ticket>>(ITYPES.Repository).to(TicketRepository);
ticketContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource);

//Import
ticketContainer.bind<ISeatFlightService<SeatFlight>>(SERVICE_TYPES.SeatFlight).toConstantValue(seatFlightService);

const ticketController = ticketContainer.get<ITicketController<Ticket>>(ITYPES.Controller);
const ticketService = ticketContainer.get<ITicketService<Ticket>>(ITYPES.Service);

export { ticketController, ticketService };