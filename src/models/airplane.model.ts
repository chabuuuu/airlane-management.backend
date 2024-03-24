import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Flight } from '@/models/flight.model';

@Entity()
export class Airplane {
  @Column({ type: 'uuid', primary: true })
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
