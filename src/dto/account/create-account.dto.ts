import { IsDateString, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

/** 
 * @openapi
 * components:
 *   schemas:
 *     CreateAccountDto:
 *       properties:
 *         roleId:
 *           type: string
 *           example: 1
 *           minLength: 1
 *         email:
 *           type: string
 *           minLength: 1
 *           example: "haphthinh@gmail.com"
 *         password:
 *           type: string
 *           minLength: 1
 *           example: "@1Hkdsadas"
 *         fullname:
 *           type: string
 *           minLength: 1
 *           example: Thinh Ha
 *         address:
 *           type: string
 *           minLength: 1
 *           example: UIT
 *         phone_number:
 *           type: string
 *           minLength: 1
 *           example: "+8490123456789"
 *         birthday:
 *           type: string
 *           minLength: 1
 *           example: 2004-03-03
 *       type: object
 *       required:
 *         - roleId
 *         - email
 *         - password
 *         - fullname
 *         - address
 *         - phone_number
 *         - birthday
 *     CreateAccount200Response:
 *       properties:
 *         roleId:
 *           type: string
 *           example: cnxcasdasd
 *           minLength: 1
 *         email:
 *           type: string
 *           minLength: 1
 *           example: test@gmail.com
 *         fullname:
 *           type: string
 *           minLength: 1
 *         address:
 *           type: string
 *           minLength: 1
 *         phone_number:
 *           type: string
 *           minLength: 1
 *         birthday:
 *           type: string
 *           minLength: 1
 *         id:
 *           type: string
 *           example: "fc6dcb64-a8fe-4e7c-bf8e-f9801d3b9321"
 *         created_at:
 *           type: string
 *           example: "2021-09-29T09:00:00.000Z"
 *         updated_at:
 *           type: string
 *           example: "2021-09-29T09:00:00.000Z"
 *       type: object
*/

export class CreateAccountDto {
    @IsNotEmpty()
    @IsString()   
    roleId! : string

    @IsNotEmpty()
    @IsString()
    email! : string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password!: string

    @IsNotEmpty()
    @IsString()
    fullname! : string

    @IsNotEmpty()
    @IsString()
    address! : string
    
    @IsNotEmpty()
    @IsString()
    phone_number! : string

    @IsNotEmpty()
    @IsDateString()
    birthday! : Date
}

// const schemas = validationMetadatasToSchemas()
// console.log(JSON.stringify(schemas))