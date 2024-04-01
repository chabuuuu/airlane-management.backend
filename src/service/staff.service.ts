import { IStaffRepository } from "@/repository/interface/i.staff.repository";
import { BaseService } from "@/service/base/base.service";
import { IStaffService } from "@/service/interface/i.staff.service";
import { ITYPES } from "@/types/interface.types";
import BaseError from "@/utils/error/base.error";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
const jwt = require("jsonwebtoken");

@injectable()
export class StaffService extends BaseService implements IStaffService<any> {
  constructor(@inject(ITYPES.Repository) repository: IStaffRepository<any>) {
    super(repository);
  }
  async findOneIncludePassword(params: any): Promise<any> {
    try {
      return await this.repository._findOneIncludePassword(params);
    } catch (error) {
      throw error;
    }
  }
  async login(username: string, password: string): Promise<any> {
    try {
      const staff = await this.repository._findOneIncludePassword({
        where: { username: username },
      });
      if (!staff)
        throw new BaseError(StatusCodes.BAD_REQUEST, "fail", "Staff not found");
      if (staff.password !== password) {
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Password is incorrect"
        );
      }
      const token = jwt.sign(
        {
          id: staff.staffId,
          username: staff.username,
          password: staff.password,
          role: staff.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      delete staff.password;
      return {
        status: "suscess",
        staff: staff,
        token: "Bearer " + token,
      } as any;
    } catch (error) {
      throw error;
    }
  }
}
