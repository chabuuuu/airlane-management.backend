import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class ModifyRulesDto {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minFlightDuration!: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxIntermediateAirport!: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minIntermediateAirportStopDelay!: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxIntermediateAirportStopDelay!: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minBookingTime!: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minCancelBookingTime!: number;
}