import { Flight } from '@/models/flight.model';
import { IntermediateAirport } from '@/models/intermediate_airport.model';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  airportId!: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  airportCode!: string;

  @Column({ type: 'varchar', length: 255 })
  airportName!: string;

  @Column({ type: 'varchar', length: 100 })
  city!: string;

  @Column({ type: 'varchar', length: 100 })
  country!: string;

  @Column({ type: 'varchar', length: 50, default: 'Đang hoạt động' })
  status!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'text', nullable: true })
  airportPicture!: string | null;

  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  update_at!: Date;

  //FKs:
  @OneToMany(() => Flight, flight => flight.departureAirport) 
  departures!: Flight[];

  @OneToMany(() => Flight, flight => flight.arrivalAirport) 
  arrivals!: Flight[];

  @OneToMany(() => IntermediateAirport, intermediate => intermediate.airport)
  intermediateStops!: IntermediateAirport[];
}
