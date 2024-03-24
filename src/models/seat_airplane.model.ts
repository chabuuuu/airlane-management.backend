import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Airplane } from '@/models/airplane.model';
import { Seat } from '@/models/seat.model';
import { Ticket } from '@/models/ticket.model';

@Entity()
export class SeatAirplane {
  @PrimaryColumn()
  seatId!: string;

  @ManyToOne(() => Seat, (seat) => seat.seatId)
  seat!: Seat;

  @PrimaryColumn()
  airplaneId!: string;

  @ManyToOne(() => Airplane, (airplane) => airplane.airplaneId)
  airplane!: Airplane;

  @Column({ type: 'uuid', unique: true })
  ticketId!: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketID)
  ticket!: Ticket;

  @Column({ type: 'enum', enum: ['Economy', 'Business'], default: 'Economy' })
  class!: 'Economy' | 'Business';
}