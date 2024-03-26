import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ticket } from '@/models/ticket.model';

@Entity()
export class Booking {
  @PrimaryColumn({ type: 'uuid' })
  bookingId!: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketId)
  @JoinColumn({ name: 'ticketId' })
  ticket!: Ticket;

  @Column({nullable: true})
  ticketId!: string;

  @Column({ type: 'boolean', default: false })
  paymentStatus!: boolean;

  @Column({ type: 'enum', enum: ['Đã lấy vé', 'Chưa lấy vé', 'Hủy đặt vé'], default:  'Chưa lấy vé'})
  bookingStatus!: 'Đã lấy vé' | 'Chưa lấy vé' | 'Hủy đặt vé';

  @CreateDateColumn({ type: 'datetime' })
  bookedAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date;
}
