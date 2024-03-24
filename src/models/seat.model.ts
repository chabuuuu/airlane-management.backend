import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  seatId!: string;

}
