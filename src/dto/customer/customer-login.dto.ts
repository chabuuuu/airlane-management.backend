import { IsEmail, IsNotEmpty } from "class-validator";

export class CustomerLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    password!: string
}