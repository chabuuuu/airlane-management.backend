import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
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

  @Column({ type: 'datetime' })
  bookedAt!: Date;

  @Column({ type: 'datetime' })
  updateAt!: Date;
}
