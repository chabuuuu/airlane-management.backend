import { Entity, JoinColumn, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Ticket } from '@/models/ticket.model';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  bookingId!: string;

  @OneToOne(() => Ticket, ticket => ticket.bookings)   //da check
  @JoinColumn({ name: 'ticketID' })
  ticket!: Ticket;  

  @Column({ type: 'boolean', default: false })
  paymentStatus!: boolean;

  @Column({ type: 'enum', enum: ['Đã lấy vé', 'Chưa lấy vé', 'Hủy đặt vé'] })
  bookingStatus!: 'Đã lấy vé' | 'Chưa lấy vé' | 'Hủy đặt vé';

  @CreateDateColumn({ type: 'datetime' })
  bookedAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date;
}
