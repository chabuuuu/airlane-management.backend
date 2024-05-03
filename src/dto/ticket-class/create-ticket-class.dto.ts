import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTicketClassDto {
    @IsNotEmpty()
    @IsString()
    className!: string;

    @IsNotEmpty()
    @IsString()
    color!: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    priceBonusInterest!: number;
}