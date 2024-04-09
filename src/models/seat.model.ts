import { SeatAirplane } from '@/models/seat_airplane.model';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Seat {
  @PrimaryColumn({ type: 'varchar' })
  seatId!: string;

  @Column()
  seat_index!: number;

  @OneToMany(() => SeatAirplane, seatAirplane => seatAirplane.seat) 
  seatAirplanes!: SeatAirplane[];  
}