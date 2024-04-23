import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FindFlightDto {
    @IsNotEmpty()
    @IsString()
    departure!: string;

    @IsNotEmpty()
    @IsString()
    arrival!: string;

    @IsOptional()
    @IsDateString()
    time!: Date;
}