import { MAX_TOTAL_SEATS } from "@/constants/total-seat.constants";
import { SeatFlight } from "@/models/seat_flight.model.";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class TicketClass {
    @PrimaryColumn({ type: 'varchar' })
    className!: string;

    @Column({ type: 'decimal', precision: 4, scale: 2 })
    priceBonusInterest!: string;

    @Column({ type: 'int' , length: MAX_TOTAL_SEATS})
    seatAmount!: number;

    @Column({ type: 'varchar' })
    color!: string;

    //FKs:
    @OneToMany(() => SeatFlight, seatFlight => seatFlight.ticketClass)
    seatFlights!: SeatFlight[];
}