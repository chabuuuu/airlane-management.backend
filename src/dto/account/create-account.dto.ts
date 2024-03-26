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
 *           example: hdasjdjasd
 *           minLength: 1
 *         email:
 *           type: string
 *           minLength: 1
 *         password:
 *           type: string
 *           minLength: 1
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
 *       type: object
 *       required:
 *         - roleId
 *         - email
 *         - password
 *         - fullname
 *         - address
 *         - phone_number
 *         - birthday
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

const schemas = validationMetadatasToSchemas()
console.log(JSON.stringify(schemas))