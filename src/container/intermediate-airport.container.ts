import { AppDataSource } from "@/database/db.datasource";
import { IIntermediateAirportRepository } from "@/repository/interface/i.intermediate-airport.repository";
import { IntermediateAirportRepository } from "@/repository/intermediate-airport.repository";
import { ITYPES } from "@/types/interface.types";
import { Container } from "inversify";

const intermediateAirportContainer = new Container();

intermediateAirportContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource);
intermediateAirportContainer.bind<IIntermediateAirportRepository<any>>(ITYPES.Repository).to(IntermediateAirportRepository);

const intermediateAirportRepository = intermediateAirportContainer.get<IIntermediateAirportRepository<any>>(ITYPES.Repository);

export {intermediateAirportRepository}