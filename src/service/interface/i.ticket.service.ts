import { CreateTicketServiceDto } from "@/dto/ticket/create-ticket.dto";
import { IBaseService } from "@/service/interface/i.base.service";

export interface ITicketService<T> extends IBaseService<T> {
    create(data: {data: CreateTicketServiceDto}): Promise<T>;
    checkAvailableSeat(data: {flightId: string, seatId: string, customerId: string}): Promise<Boolean>;
    printTicket(ticketId: string): Promise<any>;
}