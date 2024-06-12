import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class BookingRule {
    @PrimaryColumn()
    bookingRuleId!: string;

    @Column({type: 'integer'})
    minBookingTime!: number; //In day

    @Column({type: 'integer'})
    minCancelBookingTime!: number; //In day
}