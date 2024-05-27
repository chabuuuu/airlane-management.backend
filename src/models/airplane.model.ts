import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Flight } from '@/models/flight.model';
import { SeatAirplane } from '@/models/seat_airplane.model';
import { MAX_TOTAL_SEATS } from '@/constants/total-seat.constants';

@Entity()
export class Airplane {
  @PrimaryGeneratedColumn('uuid')
  airplaneId!: string;

  @Column({ unique: true, nullable: true })
  flightId!: string;

  @Column({ type: 'varchar', length: 20 })
  airplaneModel!: string;

  @Column({ type: 'varchar', length: 30 })
  airlines!: string;

  @Column({default: MAX_TOTAL_SEATS})
  total_seat!: number;

  @Column()
  total_business_seat!: number;

  @Column()
  total_economy_seat!: number;

  //FKs:
  @OneToOne(() => Flight)
  @JoinColumn({name: 'flightId'})
  flight!: Flight;

  @OneToMany(() => SeatAirplane, seatAirplane => seatAirplane.airplane) 
  seatAirplanes!: SeatAirplane[];
}
