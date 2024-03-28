import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Column } from 'typeorm';
import { Ticket } from '@/models/ticket.model';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  staffId!: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 50})
  fullname!: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 30 })
  password!: string;

  @Column({ type: 'date' })
  birthday!: Date;

  @Column({ type: 'enum', enum: ["Staff_LV1", "Staff_LV2"], default: "Staff_LV1" })
  role!: "Staff_LV1" | "Staff_LV2";

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @OneToMany(() => Ticket, ticket => ticket.seller) //da check
  tickets!: Ticket[];
}
