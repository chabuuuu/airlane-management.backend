import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Airport } from '@/models/airport.model';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  flightId!: number;

  @Column({ unique: true })
  flightCode!: string;

  @ManyToOne(() => Airport, (airport) => airport.airportId)
  departureAirportId!: Airport;

  @ManyToOne(() => Airport, (airport) => airport.airportId)
  arrivalAirportId!: Airport;

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

  @Column({ type: 'datetime' })
  createAt!: Date;

  @Column({ type: 'datetime' })
  updateAt!: Date;
}
