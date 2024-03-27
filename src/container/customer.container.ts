import { CustomerController } from "@/controller/customer.controller";
import { ICustomerController } from "@/controller/interface/customer.controller";
import { AppDataSource } from "@/database/db.datasource";
import { Customer } from "@/models/customer.model";
import { CustomerRepository } from "@/repository/customer.repository";
import { ICustomerRepository } from "@/repository/interface/i.customer.repository";
import { CustomerService } from "@/service/customer.service";
import { ICustomerService } from "@/service/interface/i.customer.service";
import { ITYPES } from "@/types/interface.types";
import { Container } from "inversify";

const customerContainer = new Container()

customerContainer.bind<ICustomerRepository<Customer>>(ITYPES.Repository).to(CustomerRepository)
customerContainer.bind<ICustomerService<any>>(ITYPES.Service).to(CustomerService)
customerContainer.bind<ICustomerController<any>>(ITYPES.Controller).to(CustomerController)
customerContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource)

const customerController = customerContainer.get<ICustomerController<any>>(ITYPES.Controller)
const customerService = customerContainer.get<ICustomerService<any>>(ITYPES.Service)

export {customerController, customerService}