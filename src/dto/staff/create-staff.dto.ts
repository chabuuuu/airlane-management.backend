// src/dto/create-staff.dto.ts
import { ValidateMessage } from '@/dto/validate-message.enum';
import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Max, MaxLength } from 'class-validator';

enum StaffRole {
  Staff_LV1 = "Staff_LV1",
  Staff_LV2 = "Staff_LV2"
}

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsPhoneNumber(undefined, {
    message: ValidateMessage.IsPhoneNumber
  })
  @IsNotEmpty()
  phoneNumber!: string;

  @IsStrongPassword(undefined, {
    message: ValidateMessage.IsStrongPassword
  })
  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  @IsDateString()
  birthday!: Date;

  @IsEnum(StaffRole)
  @IsNotEmpty()
  role!: StaffRole;
}
