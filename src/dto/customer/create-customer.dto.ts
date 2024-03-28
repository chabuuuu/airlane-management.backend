// src/dto/create-customer.dto.ts
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, IsUUID, Max, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  fullname!: string;

  @IsStrongPassword()
  @MaxLength(30)
  @IsNotEmpty()
  password!: string;

  @IsDateString()
  @IsNotEmpty()
  birthday!: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  address!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nationality!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  cccd!: string;

  @IsString()
  @IsNotEmpty()
  cccdPicture!: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;
}
