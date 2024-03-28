import { Entity, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Airplane } from '@/models/airplane.model';
import { Seat } from '@/models/seat.model';
import { Ticket } from '@/models/ticket.model';

@Entity()
export class SeatAirplane {
  @PrimaryColumn({ type: 'varchar' }) //xem lại có mấy thuộc tính cần làm khóa chính
  seatId!: string;

  @PrimaryColumn() //xem lại có mấy thuộc tính cần làm khóa chính
  airplaneId!: string;

  @ManyToOne(() => Seat, seat => seat.seatAirplanes) 
  @JoinColumn({ name: 'seatId' })   //sửa ở đây nè thịnh
  seat!: Seat;

  @ManyToOne(() => Airplane, airplane => airplane.seatAirplanes) //da check
  @JoinColumn({ name: 'airplaneId' })  
  airplane!: Airplane;

  @OneToOne(() => Ticket, ticket => ticket.seatAirplane)  //da check
  @JoinColumn({ name: 'ticketId' })
  ticket!: Ticket;

  @Column({ type: 'enum', enum: ['Economy', 'Business'], default: 'Economy' })
  class!: 'Economy' | 'Business';
}
