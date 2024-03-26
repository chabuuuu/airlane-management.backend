// src/dto/update-staff.dto.ts
import { ValidateMessage } from '@/dto/validate-message.enum';
import { IsDate, IsDateString, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MaxLength } from 'class-validator';

enum StaffRole {
  Staff_LV1 = "Staff_LV1",
  Staff_LV2 = "Staff_LV2"
}

export class UpdateStaffDto {
  @IsString()
  @IsOptional()
  @MaxLength(30)
  username!: string;

  @IsEmail()
  @IsOptional()
  email!: string;

  @IsPhoneNumber(undefined, {
    message: ValidateMessage.IsPhoneNumber
  })
  @IsOptional()
  phoneNumber!: string;

  @IsStrongPassword(undefined, {
    message: ValidateMessage.IsStrongPassword
  })
  @IsOptional()
  password!: string;

  @IsOptional()
  @IsDateString()
  birthday!: Date;

  @IsEnum(StaffRole)
  @IsOptional()
  role!: StaffRole;
}
