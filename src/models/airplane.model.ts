import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Flight } from '@/models/flight.model';
import { SeatAirplane } from '@/models/seat_airplane.model';

@Entity()
export class Airplane {
  @PrimaryGeneratedColumn('uuid')
  airplaneId!: string;

  @Column({ unique: true, nullable: true })
  flightId!: number;

  @Column({ type: 'varchar', length: 20 })
  airplaneModel!: string;

  @Column({ type: 'varchar', length: 30 })
  airlines!: string;

  //FKs:
  @OneToOne(() => Flight)
  @JoinColumn({name: 'flightId'})
  flight!: Flight;

  @OneToMany(() => SeatAirplane, seatAirplane => seatAirplane.airplane) 
  seatAirplanes!: SeatAirplane[];
}
