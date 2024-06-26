import { Ticket } from '@/models/ticket.model';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  staffId!: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 30 })
  password!: string;

  @Column({ type: 'date' })
  birthday!: Date;

  @Column({ type: 'enum', enum: ["Staff_LV1", "Staff_LV2"], default: "Staff_LV2" })
  role!: "Staff_LV1" | "Staff_LV2";

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  //FKs:
  @OneToMany(() => Ticket, ticket => ticket.seller)
  tickets!: Ticket[];
}
