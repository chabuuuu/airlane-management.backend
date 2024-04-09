import { AppDataSource } from "@/database/db.datasource";
import { Seat } from "@/models/seat.model";
import { ISeatRepository } from "@/repository/interface/i.seat.repository";
import { SeatRepository } from "@/repository/seat.repository";
import { ITYPES } from "@/types/interface.types";
import { Container } from "inversify";

const seatContainer = new Container();

seatContainer.bind<ISeatRepository<Seat>>(ITYPES.Repository).to(SeatRepository);
seatContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource);

const seatRepository = seatContainer.get<ISeatRepository<Seat>>(ITYPES.Repository);

export {seatRepository};