import { BaseService } from "@/service/base/base.service";
import { ICustomerService } from "@/service/interface/i.customer.service";
import { ITYPES } from "@/types/interface.types";
import BaseError from "@/utils/error/base.error";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
const jwt = require("jsonwebtoken");

@injectable()
export class CustomerService
  extends BaseService
  implements ICustomerService<any>
{
  constructor(@inject(ITYPES.Repository) repository: ICustomerService<any>) {
    super(repository);
  }
  async login(params: any): Promise<any> {
    try {
      const { email, password } = params;      
      const customer = await this.repository._findOneIncludePassword({
        where: { email: email },
      });
      if (!customer)
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Customer not found"
        );
      if (!customer.emailValidated)
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Email not verified"
        );
      if (customer.password !== password) {
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Password is incorrect"
        );
      }
      const token = jwt.sign(
        {
          id: customer.customerId,
          email: customer.email,
          password: customer.password,
          role: "Customer",
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      delete customer.password;
      delete customer.cccd;
      delete customer.phoneNumber;
      delete customer.cccdPicture;
      return {
        status: "suscess",
        customer: customer,
        token: 'Bearer ' + token,
      } as any;
    } catch (error) {
      throw error;
    }
  }
}
