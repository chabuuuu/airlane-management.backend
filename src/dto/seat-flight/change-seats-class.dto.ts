import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChangeSeatsClassDto {

    @IsNotEmpty()
    @IsString()
    flightId!: string;

    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    @IsNotEmpty()
    seatIdList!: string[];

    @IsString()
    class!: string;
}   