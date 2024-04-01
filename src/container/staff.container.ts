import { IStaffController } from "@/controller/interface/i.staff.controller";
import { StaffController } from "@/controller/staff.controller";
import { AppDataSource } from "@/database/db.datasource";
import { Staff } from "@/models/staff.model";
import { IStaffRepository } from "@/repository/interface/i.staff.repository";
import { StaffRepository } from "@/repository/staff.repository";
import { IStaffService } from "@/service/interface/i.staff.service";
import { StaffService } from "@/service/staff.service";
import { ITYPES } from "@/types/interface.types";
import { Container } from "inversify";

const staffContainer = new Container()

staffContainer.bind<IStaffController<any>>(ITYPES.Controller).to(StaffController)
staffContainer.bind<IStaffRepository<Staff>>(ITYPES.Repository).to(StaffRepository)
staffContainer.bind<IStaffService<any>>(ITYPES.Service).to(StaffService)
staffContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource)

const staffController = staffContainer.get<IStaffController<any>>(ITYPES.Controller)
const staffService = staffContainer.get<IStaffService<any>>(ITYPES.Service)

export {staffController, staffService}