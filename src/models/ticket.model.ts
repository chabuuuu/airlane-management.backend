import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Flight } from '@/models/flight.model';
import { Staff } from '@/models/staff.model';
import { Customer } from '@/models/customer.model';
import { TicketStatus } from '@/enums/ticket-status.enum';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  ticketId!: string;

  @Column()
  flightId!: number

  @Column()
  passengerId!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column()
  sellerId!: string

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.Pending })
  status!: string;

  @Column({ type: 'datetime', nullable: true })
  sellAt?: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date;

  //FKs:
  @ManyToOne(() => Customer, (passenger) => passenger.tickets) 
  @JoinColumn({ name: 'passengerId' })
  passenger!: Customer;

  @ManyToOne(() => Staff, (staff) => staff.tickets)
  @JoinColumn({name: 'sellerId'})
  seller!: Staff;

  @ManyToOne(() => Flight, (flight) => flight.tickets)
  @JoinColumn({name: 'flightId'})
  flight!: Flight;
}

