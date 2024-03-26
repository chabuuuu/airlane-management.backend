// src/dto/create-customer.dto.ts
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsDate()
  @IsNotEmpty()
  birthday!: Date;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  nationality!: string;

  @IsBoolean()
  @IsOptional()
  emailValidated?: boolean;

  @IsString()
  @IsOptional()
  cccd?: string;

  @IsString()
  @IsOptional()
  cccdPicture?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;
}
