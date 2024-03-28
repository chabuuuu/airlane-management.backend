import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Flight } from '@/models/flight.model';
import { SeatAirplane } from '@/models/seat_airplane.model';

@Entity()
export class Airplane {
  @PrimaryGeneratedColumn('uuid')
  airplaneId!: string;

  @OneToOne(() => Flight, flight => flight.airplane)  //da check
  @JoinColumn({ name: 'flightID' })
  flight!: Flight;

  @Column({ type: 'varchar', length: 20 })
  airplaneModel!: string;

  @Column({ type: 'varchar', length: 30 })
  airlines!: string;

  @OneToMany(() => SeatAirplane, seatAirplane => seatAirplane.airplane)  //da check
  seatAirplanes!: SeatAirplane[];
}
