import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Ticket } from '@/models/ticket.model';

@Entity()
export class Booking {
  @PrimaryColumn({ type: 'uuid' })
  bookingId!: string;

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

  //FKs:
  @OneToOne(() => Ticket)
  @JoinColumn({ name: 'ticketId' })
  ticket!: Ticket;  
}
