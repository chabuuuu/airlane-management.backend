import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Seat {
  @PrimaryColumn({ type: 'varchar' })
  seatId!: string;
}