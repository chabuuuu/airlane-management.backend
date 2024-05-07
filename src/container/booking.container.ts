import { seatFlightService } from "@/container/seat-flight.container";
import { BookingController } from "@/controller/booking.controller";
import { IBookingController } from "@/controller/interface/i.booking.controller";
import { AppDataSource } from "@/database/db.datasource";
import { Booking } from "@/models/booking.model";
import { SeatFlight } from "@/models/seat_flight.model.";
import { BookingRepository } from "@/repository/booking.repository";
import { IBookingRepository } from "@/repository/interface/i.booking.repository";
import { BookingService } from "@/service/booking.service";
import { IBookingService } from "@/service/interface/i.booking.service";
import { ISeatFlightService } from "@/service/interface/i.seat-flight.service";
import { ITYPES } from "@/types/interface.types";
import { SERVICE_TYPES } from "@/types/service.types";
import { Container } from "inversify";

const bookingContainer = new Container();

bookingContainer.bind<IBookingController<Booking>>(ITYPES.Controller).to(BookingController);
bookingContainer.bind<IBookingRepository<Booking>>(ITYPES.Repository).to(BookingRepository);
bookingContainer.bind(ITYPES.Datasource).toConstantValue(AppDataSource);
bookingContainer.bind<IBookingService<Booking>>(ITYPES.Service).to(BookingService);

//Import 
bookingContainer.bind<ISeatFlightService<SeatFlight>>(SERVICE_TYPES.SeatFlight).toConstantValue(seatFlightService);

const bookingService = bookingContainer.get<IBookingService<Booking>>(ITYPES.Service);
const bookingController = bookingContainer.get<IBookingController<Booking>>(ITYPES.Controller);
const bookingRepository = bookingContainer.get<IBookingRepository<Booking>>(ITYPES.Repository);

export {bookingController, bookingService, bookingRepository};