import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Airport } from '@/models/airport.model';
import { Airplane } from '@/models/airplane.model';
import { Ticket } from '@/models/ticket.model';
import { IntermediateAirport } from '@/models/intermediate_airport.model';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  flightId!: number;

  @Column({ unique: true })
  flightCode!: string;

  @ManyToOne(() => Airport, airport => airport.departures) //da check
  @JoinColumn({ name: 'departureAirportId' }) 
  departureAirport!: Airport;

  @ManyToOne(() => Airport, airport => airport.arrivals) //da check
  @JoinColumn({ name: 'arrivalAirportId' })
  arrivalAirport!: Airport;

  @Column({ type: 'datetime' })
  departureTime!: Date;

  @Column({ type: 'decimal' })
  flightDuration!: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  economyPrice!: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  businessPrice!: number;

  @Column({ type: 'varchar', length: 20, default: 'Chưa khởi hành' })
  status!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @OneToMany(() => Ticket, ticket => ticket.flight) //da check
  tickets!: Ticket[]; 

  @OneToMany(() => IntermediateAirport, intermediate => intermediate.flight) //da check
  intermediateAirports!: IntermediateAirport[];

  @OneToOne(() => Airplane, airplane => airplane.flight)   //da check
  airplane!: Airplane;
}