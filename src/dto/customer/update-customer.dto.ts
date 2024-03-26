// src/dto/update-customer.dto.ts
import { IsBoolean, IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsDate()
  @IsOptional()
  birthday?: Date;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  nationality?: string;

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
