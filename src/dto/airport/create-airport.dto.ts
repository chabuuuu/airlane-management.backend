// src/dto/create-airport.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsOptional, MAX, IsEnum } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAirportDto:
 *       properties:
 *         airportCode:
 *           minLength: 1
 *           type: string
 *           maxLength: 5
 *           example: VN_TSN
 *         airportName:
 *           example: "Tân Sơn Nhất"
 *           maxLength: 255
 *           type: string
 *           minLength: 1
 *         city:
 *           example: "Hồ Chí Minh"
 *           maxLength: 100
 *           type: string
 *           minLength: 1
 *         country:
 *           example: "Việt Nam"
 *           maxLength: 100
 *           type: string
 *           minLength: 1
 *         status:
 *           example: "Đang hoạt động"
 *           enum:
 *             - Đang hoạt động
 *             - Đang bảo trì
 *             - Đang tạm dừng
 *             - Đã dừng hoạt động
 *           type: string
 *         description:
 *           example: "Sân bay quốc tế Tân Sơn Nhất là sân bay quốc tế lớn nhất ở Việt Nam"
 *           type: string
 *         airportPicture:
 *           example: "https://media.vneconomy.vn/w800/images/upload/2021/04/20/tan-son-nhat-16126178445991097065305-51-0-550-888-crop-1612617849467785737789.jpg"
 *           type: string
 *       type: object
 *       required:
 *         - airportCode
 *         - airportName
 *         - city
 *         - country
 *     CreateSuccess:
 *       type: object
 *       description: "The data of the created object - The same of the get one by id API"
 * 
 *     UpdateAirportDto:
 *       properties:
 *         airportCode:
 *           maxLength: 5
 *           type: string
 *         airportName:
 *           maxLength: 255
 *           type: string
 *         city:
 *           maxLength: 100
 *           type: string
 *         country:
 *           maxLength: 100
 *           type: string
 *         status:
 *           example: "Đang bảo trì"
 *           enum:
 *             - Đang hoạt động
 *             - Đang bảo trì
 *             - Đang tạm dừng
 *             - Đã dừng hoạt động
 *           type: string
 *         description:
 *           type: string
 *         airportPicture:
 *           type: string
 *       type: object
 * 
 *     UpdateSuccess:
 *       properties:
 *         updateData:
 *           type: object
 *           description: "The data field that was updated. Example: { airportName: 'Tân Sơn Nhất' }"
 *         where:
 *           type: object
 *           description: "Where the data was updated. Example: { airportCode: 'VN_TSN' }"
 *         generatedMaps:
 *           type: object
 *         raw:
 *           type: object
 *         affected:
 *           type: number
 *           description: "The number of rows affected by the update"
 *           example: 1
 *       type: object
 * 
 *     GetAirportById:
 *       properties:
 *         airportCode:
 *           minLength: 1
 *           type: string
 *           maxLength: 5
 *           example: VN_TSN
 *         airportName:
 *           example: "Tân Sơn Nhất"
 *           maxLength: 255
 *           type: string
 *           minLength: 1
 *         city:
 *           example: "Hồ Chí Minh"
 *           maxLength: 100
 *           type: string
 *           minLength: 1
 *         country:
 *           example: "Việt Nam"
 *           maxLength: 100
 *           type: string
 *           minLength: 1
 *         status:
 *           example: "Đang hoạt động"
 *           enum:
 *             - Đang hoạt động
 *             - Đang bảo trì
 *             - Đang tạm dừng
 *             - Đã dừng hoạt động
 *           type: string
 *         description:
 *           example: "Sân bay quốc tế Tân Sơn Nhất là sân bay quốc tế lớn nhất ở Việt Nam"
 *           type: string
 *         airportPicture:
 *           example: "https://media.vneconomy.vn/w800/images/upload/2021/04/20/tan-son-nhat-16126178445991097065305-51-0-550-888-crop-1612617849467785737789.jpg"
 *           type: string
 *       type: object
 * 
 *     DeleteSuccess:
 *       properties:
 *         deleteData:
 *           type: object
 *           description: "Data of deleted item, example: {id: 1, name: 'John Doe'}"
 *         where:
 *           type: object
 *           description: "Where condition of deleted item, example: {id: 1}"
 *       type: object
 */

export class CreateAirportDto {
  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  airportCode!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  airportName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country!: string;

  @IsOptional()
  @IsEnum(["Đang hoạt động", "Đang bảo trì", "Đang tạm dừng", "Đã dừng hoạt động"])
  status!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  airportPicture?: string;
}
