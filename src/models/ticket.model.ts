import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Flight } from '@/models/flight.model';
import { Staff } from '@/models/staff.model';

@Entity()
export class Ticket {
  @PrimaryColumn({ type: 'uuid' })
  ticketID!: string;

  @ManyToOne(() => Flight, (flight) => flight.flightId)
  flightID!: Flight;

  @Column()
  passengerId!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @ManyToOne(() => Staff, (staff) => staff.staffId)
  sellerId!: Staff;

  @Column({ type: 'enum', enum: ['Booked', 'Selled', 'Cancelled'] })
  status!: 'Booked' | 'Selled' | 'Cancelled';

  @Column({ type: 'datetime', nullable: true })
  sellAt!: Date | null;

  @Column({ type: 'datetime' })
  updateAt!: Date;
}
