import { ITicketClassController } from "@/controller/interface/i.ticket-class.controller";
import { TicketClassController } from "@/controller/ticket-class.controller";
import { AppDataSource } from "@/database/db.datasource";
import { TicketClass } from "@/models/ticket_class.model";
import { ITicketClassRepository } from "@/repository/interface/i.ticket-class.repository";
import { TicketClassRepository } from "@/repository/ticket-class.repository";
import { ITicketClassService } from "@/service/interface/i.ticket-class.service";
import { TicketClassService } from "@/service/ticket-class.service";
import { ITYPES } from "@/types/interface.types";
import { Container } from "inversify";

const ticketClassContainer = new Container();

ticketClassContainer.bind<ITicketClassController<TicketClass>>(ITYPES.Controller).to(TicketClassController);
ticketClassContainer.bind<ITicketClassRepository<TicketClass>>(ITYPES.Repository).to(TicketClassRepository);
ticketClassContainer.bind<ITicketClassService<TicketClass>>(ITYPES.Service).to(TicketClassService);
ticketClassContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource);

const ticketClassController = ticketClassContainer.get<ITicketClassController<TicketClass>>(ITYPES.Controller);
const ticketClassService = ticketClassContainer.get<ITicketClassService<TicketClass>>(ITYPES.Service);
const ticketClassRepository = ticketClassContainer.get<ITicketClassRepository<TicketClass>>(ITYPES.Repository);

export { ticketClassController, ticketClassService, ticketClassRepository };