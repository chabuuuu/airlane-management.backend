import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Airplane } from '@/models/airplane.model';
import { Seat } from '@/models/seat.model';
import { Ticket } from '@/models/ticket.model';

@Entity()
export class SeatAirplane {
  @PrimaryColumn()
  seatId!: string;

  @PrimaryColumn()
  airplaneId!: string;

  @Column({ type: 'uuid', unique: true, nullable: true })
  ticketId?: string;

  @Column({ type: 'enum', enum: ['Economy', 'Business'], default: 'Economy' })
  class!: 'Economy' | 'Business';

  //FKs:
  @ManyToOne(() => Airplane, (airplane) => airplane.seatAirplanes)
  @JoinColumn({ name: 'airplaneId' })
  airplane!: Airplane;

  @OneToOne(() => Ticket) 
  @JoinColumn({ name: 'ticketId' })
  ticket!: Ticket;

  @ManyToOne(() => Seat, (seat) => seat.seatAirplanes)
  @JoinColumn({ name: 'seatId' })
  seat!: Seat;
}
