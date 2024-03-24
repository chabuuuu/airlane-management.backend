import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Ticket } from '@/models/ticket.model';

@Entity()
export class Booking {
  @PrimaryColumn({ type: 'uuid' })
  bookingId!: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketID)
  ticketID!: Ticket;

  @Column({ type: 'boolean', default: false })
  paymentStatus!: boolean;

  @Column({ type: 'enum', enum: ['Đã lấy vé', 'Chưa lấy vé', 'Hủy đặt vé'] })
  bookingStatus!: 'Đã lấy vé' | 'Chưa lấy vé' | 'Hủy đặt vé';

  @CreateDateColumn({ type: 'datetime' })
  bookedAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date;
}
