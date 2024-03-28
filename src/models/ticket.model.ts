import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Flight } from '@/models/flight.model';
import { Staff } from '@/models/staff.model';
import { Booking } from '@/models/booking.model';
import { Customer  } from '@/models/customer.model';
import { SeatAirplane } from '@/models/seat_airplane.model';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  ticketID!: string;

  @ManyToOne(() => Flight, flight => flight.tickets) //da check
  @JoinColumn({ name: 'flightID' })
  flight!: Flight;

  @ManyToOne(() => Customer) //da check
  @JoinColumn({ name: 'passengerId' })
  passenger!: Customer;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @ManyToOne(() => Staff, staff => staff.tickets) //da check
  @JoinColumn({ name: 'sellerId' })
  seller!: Staff;

  @Column({ type: 'enum', enum: ['Booked', 'Selled', 'Cancelled'] })
  status!: 'Booked' | 'Selled' | 'Cancelled';

  @CreateDateColumn({ type: 'datetime' })
  sellAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date;

  @OneToOne(() => Booking, booking => booking.ticket)  //da check
  bookings!: Booking;

  @OneToOne(() => SeatAirplane, seatAirplane => seatAirplane.ticket) //da check
  seatAirplane!: SeatAirplane;
}

