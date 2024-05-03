import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Airplane } from '@/models/airplane.model';
import { Seat } from '@/models/seat.model';
import { Ticket } from '@/models/ticket.model';
import { SeatClass } from '@/enums/seat-class.enum';
import { Booking } from '@/models/booking.model';
import { TicketClass } from '@/models/ticket_class.model';
import { Flight } from '@/models/flight.model';

@Entity()
export class SeatFlight {
  @PrimaryColumn()
  seatId!: string;

  @PrimaryColumn()
  flightId!: number;

  @Column({ type: 'uuid', unique: true, nullable: true })
  ticketId?: string;

  @Column({ type: 'uuid', unique: true, nullable: true })
  bookingId?: string;

  @Column()
  class!: string;

  @Column({default: true})
  isEmpty!: boolean;


  //FKs:
  @OneToOne(() => Ticket) 
  @JoinColumn({ name: 'ticketId' })
  ticket!: Ticket;

  @OneToOne(() => Booking) 
  @JoinColumn({ name: 'bookingId' })
  booking!: Booking;

  @ManyToOne(() => TicketClass, (ticketClass) => ticketClass.seatFlights, {
    eager: true,
  })
  @JoinColumn({ name: 'class' })
  ticketClass!: TicketClass;

  @ManyToOne(() => Flight, (flight) => flight.seatFlights, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'flightId' })
  flight!: Flight;

  @ManyToOne(() => Seat, (seat) => seat.seatAirplanes)
  @JoinColumn({ name: 'seatId' })
  seat!: Seat;
}
