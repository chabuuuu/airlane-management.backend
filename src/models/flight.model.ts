import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Airport } from '@/models/airport.model';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  flightId!: number;

  @Column({ unique: true })
  flightCode!: string;

  @ManyToOne(() => Airport, (airport) => airport.airportId)
  @JoinColumn({ name: 'departureAirportId' })
  departureAirport!: Airport;

  @Column()
  departureAirportId!: number;

  @ManyToOne(() => Airport, (airport) => airport.airportId)
  @JoinColumn({ name: 'arrivalAirportId' })
  arrivalAirport!: Airport;

  @Column()
  arrivalAirportId!: number;

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
}