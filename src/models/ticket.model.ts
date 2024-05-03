import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Flight } from '@/models/flight.model';
import { Staff } from '@/models/staff.model';
import { Customer } from '@/models/customer.model';
import { TicketStatus } from '@/enums/ticket-status.enum';
import moment from 'moment-timezone';

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

  @Column({ type: 'datetime', nullable: true, 
  transformer: {
    to: (value: Date) => value,
    from: (value: string) => {
        const raw = moment(value)
        const vn = raw.clone().tz('Asia/Ho_Chi_Minh');
        return vn.format("DD-MM-YYYY HH:mm:ss");
    }
}
   })
  sellAt?: Date;

  @UpdateDateColumn({ type: 'datetime',     transformer: {
    to: (value: Date) => value,
    from: (value: string) => {
        const raw = moment(value)
        const vn = raw.clone().tz('Asia/Ho_Chi_Minh');
        return vn.format("DD-MM-YYYY HH:mm:ss");
    }
} })
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

