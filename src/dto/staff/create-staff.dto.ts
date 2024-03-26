// src/dto/create-staff.dto.ts
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum StaffRole {
  Staff_LV1 = "Staff_LV1",
  Staff_LV2 = "Staff_LV2"
}

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsDate()
  birthday!: Date;

  @IsEnum(StaffRole)
  role!: StaffRole;
}
