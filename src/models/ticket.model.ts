import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
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

  @CreateDateColumn({ type: 'datetime' })
  sellAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date;
}

