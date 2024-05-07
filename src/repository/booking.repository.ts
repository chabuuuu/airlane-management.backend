import { Booking } from "@/models/booking.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IBookingRepository } from "@/repository/interface/i.booking.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class BookingRepository extends BaseRepository<Booking> implements IBookingRepository<Booking>{
    constructor(@inject(ITYPES.Datasource) dataSource : DataSource){
        super(dataSource.getRepository(Booking))
    }
}