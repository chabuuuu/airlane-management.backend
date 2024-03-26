// src/dto/update-customer.dto.ts
import { IsBoolean, IsDate, IsDateString, IsEmail, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsEmail()
  @IsOptional()
  email!: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber!: string;

  @IsStrongPassword()
  @MaxLength(30)
  @IsOptional()
  password!: string;

  @IsDateString()
  @IsOptional()
  birthday!: Date;

  @IsBoolean()
  @IsOptional()
  emailValidated!: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  address!: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  nationality!: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  cccd!: string;

  @IsString()
  @IsOptional()
  cccdPicture?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;
}
