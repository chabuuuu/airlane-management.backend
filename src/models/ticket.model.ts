import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Flight } from '@/models/flight.model';
import { Staff } from '@/models/staff.model';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  ticketId!: string;

  @ManyToOne(() => Flight, (flight) => flight.flightId)
  @JoinColumn({name: 'flightId'})
  flight!: Flight;

  @Column()
  flightId!: number

  @Column()
  passengerId!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @ManyToOne(() => Staff, (staff) => staff.staffId)
  @JoinColumn({name: 'sellerId'})
  seller!: Staff;

  @Column()
  sellerId!: string

  @Column({ type: 'enum', enum: ['Booked', 'Selled', 'Cancelled'] })
  status!: 'Booked' | 'Selled' | 'Cancelled';

  @CreateDateColumn({ type: 'datetime' })
  sellAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date;
}

