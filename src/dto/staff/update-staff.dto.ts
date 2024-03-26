// src/dto/update-staff.dto.ts
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

enum StaffRole {
  Staff_LV1 = "Staff_LV1",
  Staff_LV2 = "Staff_LV2"
}

export class UpdateStaffDto {
  @IsString()
  @IsOptional()
  username?: string;

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

  @IsEnum(StaffRole)
  @IsOptional()
  role?: StaffRole;
}
