import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Flight } from '@/models/flight.model';

@Entity()
export class Airplane {
  @PrimaryColumn({ type: 'uuid' })
  airplaneId!: string;

  @Column({ unique: true })
  flightId!: number;

  @OneToOne(() => Flight)
  @JoinColumn()
  flight!: Flight;

  @Column({ type: 'varchar', length: 20 })
  airplaneModel!: string;

  @Column({ type: 'varchar', length: 30 })
  airlines!: string;
}
