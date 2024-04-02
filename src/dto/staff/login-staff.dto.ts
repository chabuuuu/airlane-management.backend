import { IsNotEmpty, IsString } from "class-validator";

export class LoginStaffDto {
    @IsNotEmpty()
    @IsString()
    username!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}