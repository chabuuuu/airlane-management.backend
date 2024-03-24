import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  airportId!: number;

  @Column({ type: 'varchar', length: 5, unique: true })
  airportCode!: string;

  @Column({ type: 'varchar', length: 255 })
  airportName!: string;

  @Column({ type: 'varchar', length: 100 })
  city!: string;

  @Column({ type: 'varchar', length: 100 })
  country!: string;

  @Column({ type: 'varchar', length: 50, default: 'Đang hoạt động' })
  status!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'text', nullable: true })
  airportPicture!: string | null;

  @Column({ type: 'datetime' })
  create_at!: Date;

  @Column({ type: 'datetime' })
  update_at!: Date;
}