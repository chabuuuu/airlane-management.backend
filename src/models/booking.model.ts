import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Ticket } from '@/models/ticket.model';
import { BookingStatus } from '@/enums/booking-status.enum';
import { Customer } from '@/models/customer.model';
import moment from 'moment-timezone';
import { SeatFlight } from '@/models/seat_flight.model.';

@Entity()
export class Booking {
  @PrimaryColumn({ type: 'uuid' })
  bookingId!: string;

  // @Column({nullable: true})
  // ticketId!: string;

  @Column({ type: 'boolean', default: false })
  paymentStatus!: boolean;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.BOOKED})
  bookingStatus!: string;

  @Column()
  passengerId!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @CreateDateColumn({ type: 'datetime', 
  transformer: {
    to: (value: Date) => value,
    from: (value: string) => {
        const raw = moment(value)
        const vn = raw.clone().tz('Asia/Ho_Chi_Minh');
        return vn.format("DD-MM-YYYY HH:mm:ss");
    }
}
   })
  bookedAt!: Date;

  @UpdateDateColumn({ type: 'datetime', 
  transformer: {
    to: (value: Date) => value,
    from: (value: string) => {
        const raw = moment(value)
        const vn = raw.clone().tz('Asia/Ho_Chi_Minh');
        return vn.format("DD-MM-YYYY HH:mm:ss");
    }
}
   })
  updateAt!: Date;

  // //FKs:
  // @OneToOne(() => Ticket)
  // @JoinColumn({ name: 'ticketId' })
  // ticket!: Ticket;  

  @ManyToOne(() => Customer, (passenger) => passenger.bookings) 
  @JoinColumn({ name: 'passengerId' })
  passenger!: Customer;

  @OneToOne(()=>SeatFlight, (seatFlight) => seatFlight.booking)
  seatFlight!: SeatFlight;
}
