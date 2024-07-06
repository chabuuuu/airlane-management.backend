import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTicketClassPriceDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceBonusInterest!: number;
}
