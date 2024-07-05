import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import { Flight } from "@/models/flight.model";
import { Staff } from "@/models/staff.model";
import { Customer } from "@/models/customer.model";
import { TicketStatus } from "@/enums/ticket-status.enum";
import moment from "moment-timezone";
import { SeatFlight } from "@/models/seat_flight.model.";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn("uuid")
  ticketId!: string;

  @Column()
  flightId!: string;

  @Column({ nullable: true })
  passengerId?: string;

  //Passenger info-------------------
  @Column({ nullable: true })
  fullName?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  cccd?: string;
  //--------------------------------

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column()
  sellerId!: string;

  @Column({ type: "enum", enum: TicketStatus, default: TicketStatus.Pending })
  status!: string;

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => {
        const raw = moment(value);
        const vn = raw.clone().tz("Asia/Ho_Chi_Minh");
        return vn.format("DD-MM-YYYY HH:mm:ss");
      },
    },
  })
  sellAt!: Date;

  @UpdateDateColumn({
    type: "datetime",
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => {
        const raw = moment(value);
        const vn = raw.clone().tz("Asia/Ho_Chi_Minh");
        return vn.format("DD-MM-YYYY HH:mm:ss");
      },
    },
  })
  updateAt!: Date;

  //FKs:
  @ManyToOne(() => Customer, (passenger) => passenger.tickets)
  @JoinColumn({ name: "passengerId" })
  passenger!: Customer;

  @ManyToOne(() => Staff, (staff) => staff.tickets)
  @JoinColumn({ name: "sellerId" })
  seller!: Staff;

  @ManyToOne(() => Flight, (flight) => flight.tickets)
  @JoinColumn({ name: "flightId" })
  flight!: Flight;

  @OneToOne(() => SeatFlight, (seatFlight) => seatFlight.ticket, {
    cascade: ["update"],
  })
  seatFlight!: SeatFlight;
}
