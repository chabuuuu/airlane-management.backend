import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { SeatAirplane } from '@/models/seat_airplane.model';

@Entity()
export class Seat {
  @PrimaryColumn({ type: 'varchar' })
  seatId!: string;

  @OneToMany(() => SeatAirplane, seatAirplane => seatAirplane.seat)  //sửa ở đây nè thịnh
  seatAirplanes!: SeatAirplane[];  
}