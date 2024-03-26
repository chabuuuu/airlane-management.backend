// src/dto/create-airplane.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsUUID, Max } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAirplaneDto:
 *       properties:
 *         flightId:
 *           type: string
 *           example: 125
 *         airplaneModel:
 *           maximum: 20
 *           type: string
 *           example: "Boeing 737"
 *           minLength: 1
 *         airlines:
 *           maximum: 30
 *           type: string
 *           minLength: 1
 *           example: "VIETJET"
 *       type: object
 *       required:
 *         - airplaneModel
 *         - airlines
 *     Create&UpdateAirplaneSuccess:
 *       properties:
 *         flightId:
 *           type: string
 *           example: 125
 *         airplaneModel:
 *           maximum: 20
 *           type: string
 *           example: "Boeing 737"
 *           minLength: 1
 *         airlines:
 *           maximum: 30
 *           type: string
 *           minLength: 1
 *           example: "VIETJET"
 *         airplaneId:
 *           type: string
 *           example: "fc6dcb64-a8fe-4e7c-bf8e-f9801d3b9321"
 *       type: object
 */

export class CreateAirplaneDto {
  @IsOptional()
  @IsString()
  flightId!: string;

  @IsString()
  @IsNotEmpty()
  @Max(20)
  airplaneModel!: string;

  @IsString()
  @IsNotEmpty()
  @Max(30)
  airlines!: string;
}

import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

const schemas = validationMetadatasToSchemas()
console.log(JSON.stringify(schemas))