import { MAX_TOTAL_SEATS } from "@/constants/total-seat.constants";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class UpdateSeatClassDto {
    @IsNotEmpty()
    @IsString()
    airplaneId!: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Max(MAX_TOTAL_SEATS)
    @Min(1)
    total_seat!: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Max(MAX_TOTAL_SEATS)
    @Min(1)
    total_business_seat!: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Max(MAX_TOTAL_SEATS)
    @Min(1)
    total_economy_seat!: number;
}