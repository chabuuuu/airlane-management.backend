import { MAX_TOTAL_SEATS } from "@/constants/total-seat.constants";
import { SeatFlight } from "@/models/seat_flight.model.";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class TicketClass {
    @PrimaryColumn({ type: 'varchar' })
    className!: string;

    @Column({ type: 'decimal', precision: 4, scale: 2 })
    priceBonusInterest!: number;

    // @Column({ type: 'int' })
    // seatAmount!: number;

    @Column({ type: 'varchar' })
    color!: string;

    @Column({default: false})
    isDefaultClass!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    //FKs:
    @OneToMany(() => SeatFlight, seatFlight => seatFlight.ticketClass)
    seatFlights!: SeatFlight[];
}