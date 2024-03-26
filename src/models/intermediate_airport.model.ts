import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryColumn, JoinColumn } from 'typeorm';
import { Flight } from '@/models/flight.model';
import { Airport } from '@/models/airport.model';

@Entity()
export class IntermediateAirport {
  @PrimaryColumn()
  flightId!: number;

  @PrimaryColumn()
  airportId!: number;

  @ManyToOne(() => Flight, (flight) => flight.flightId)
  @JoinColumn({ name: 'flightId' })
  flight!: Flight;

  @ManyToOne(() => Airport, (airport) => airport.airportId)
  @JoinColumn({ name: 'airportId' })
  airport!: Airport;

  @Column({ type: 'decimal', precision: 5, scale: 1 })
  duration!: number;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
