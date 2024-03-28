import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    customerId!: string;

    @Column("varchar", { length: 50, unique: true })
    email!: string;

    @Column("varchar", { length: 15, unique: true })
    phoneNumber!: string;

    @Column("varchar", {length: 50})
    fullname!: string;

    @Column("varchar", { length: 30 })
    password!: string;

    @Column("date")
    birthday!: Date;

    @Column("varchar", { length: 50 })
    address!: string;

    @Column("varchar", { length: 50 })
    nationality!: string;

    @Column({ type: "boolean", default: false })
    emailValidated!: boolean;

    @Column("varchar", { length: 50, unique: true })
    cccd!: string;

    @Column("text")
    cccdPicture!: string;

    @Column("text", { nullable: true })
    profilePicture!: string | null;

    @CreateDateColumn()
    createAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
}
