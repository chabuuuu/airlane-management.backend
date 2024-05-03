import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Airport } from '@/models/airport.model';
import { IntermediateAirport } from '@/models/intermediate_airport.model';
import { Ticket } from '@/models/ticket.model';
import { FlightStatus } from '@/enums/flight-status.enum';
import { SeatFlight } from '@/models/seat_flight.model.';
import moment from 'moment-timezone';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn('increment')
  flightId!: number;

  // @Column({ unique: true })
  // flightCode!: string;

  @ManyToOne(() => Airport, (airport) => airport.departures)
  @JoinColumn({ name: 'departureAirportId' })
  departureAirport!: Airport; 

  @Column()
  departureAirportId!: number;

  @ManyToOne(() => Airport, (airport) => airport.arrivals)
  @JoinColumn({ name: 'arrivalAirportId' })
  arrivalAirport!: Airport;

  @Column()
  arrivalAirportId!: number;

  @Column({ type: 'datetime', 
    transformer: {
        to: (value: Date) => value,
        from: (value: string) => {
            const raw = moment(value)
            const vn = raw.clone().tz('Asia/Ho_Chi_Minh');
            return vn.format("DD-MM-YYYY HH:mm:ss");
        }
    }
 })
  departureTime!: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2})
  flightDuration!: number;

  // @Column({ type: 'decimal', precision: 10, scale: 0 })
  // economyPrice!: number;

  // @Column({ type: 'decimal', precision: 10, scale: 0 })
  // businessPrice!: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  price!: number;

  @Column({ type: 'enum', enum: FlightStatus, default: FlightStatus.NotStarted })
  status!: string;

  @Column({ type: 'varchar', length: 30 })
  airlines!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => {
          const raw = moment(value)
          const vn = raw.clone().tz('Asia/Ho_Chi_Minh');
          return vn.format("DD-MM-YYYY HH:mm:ss");
      }
  }
  })
  createAt!: Date;

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => {
          const raw = moment(value)
          const vn = raw.clone().tz('Asia/Ho_Chi_Minh');
          return vn.format("DD-MM-YYYY HH:mm:ss");
      }
  }
  })
  updateAt!: Date;

  //FKs:
  @OneToMany(() => IntermediateAirport, intermediate => intermediate.flight) 
  intermediateAirports!: IntermediateAirport[];

  @OneToMany(() => Ticket, ticket => ticket.flight) 
  tickets!: Ticket[]; 

  @OneToMany(() => SeatFlight, seatFlight => seatFlight.flight) 
  seatFlights!: SeatFlight[]; 
}