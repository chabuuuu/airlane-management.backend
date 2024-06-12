import { AppDataSource } from "@/database/db.datasource";
import { BookingRuleRepository } from "@/repository/booking-rule.repository";
import { IBookingRuleRepository } from "@/repository/interface/i.booking-rule.repository";
import { ITYPES } from "@/types/interface.types";
import { Container } from "inversify";

const bookingRuleContainer = new Container()
bookingRuleContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource)
bookingRuleContainer.bind<IBookingRuleRepository<any>>(ITYPES.Repository).to(BookingRuleRepository)

const bookingRuleRepository = bookingRuleContainer.get<IBookingRuleRepository<any>>(ITYPES.Repository)

export { bookingRuleRepository }