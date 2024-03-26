// src/dto/update-airplane.dto.ts
import { IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdareAirplaneDto:
 *       properties:
 *         flightId:
 *           type: string
 *           example: 125
 *         airplaneModel:
 *           maximum: 20
 *           type: string
 *           example: 'Boeing 737'
 *           minLength: 1
 *         airlines:
 *           maximum: 30
 *           type: string
 *           minLength: 1
 *           example: 'VIETJET'
 *       type: object
 */

export class UpdateAirplaneDto {
  @IsOptional()
  flightId?: string;

  @IsString()
  @IsOptional()
  airplaneModel?: string;

  @IsString()
  @IsOptional()
  airlines?: string;
}
