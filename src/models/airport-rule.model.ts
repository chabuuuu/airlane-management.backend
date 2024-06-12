import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AirportRule {

    @PrimaryColumn()
    airportRuleId!: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, 
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        }
    }
    )
    minFlightDuration!: number; //In minutes, ex: 2.5h, 5.5h,...

    @Column({type: 'integer'})
    maxIntermediateAirport!: number

    @Column({ type: 'integer' })
    minIntermediateAirportStopDelay!: number; //In minutes, ex: 20m, 30m,...

    @Column({ type: 'integer'})
    maxIntermediateAirportStopDelay!: number; //In minutes, ex: 20m, 30m,...
}