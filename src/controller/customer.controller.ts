import { anonymousUserId } from "@/constants/user.constants";
import { BaseController } from "@/controller/base/base.controller";
import { ICustomerController } from "@/controller/interface/customer.controller";
import { ICustomerService } from "@/service/interface/i.customer.service";
import { ITYPES } from "@/types/interface.types";
import BaseError from "@/utils/error/base.error";
import oauth2Client from "@/utils/google-api/google-oauth2.client.util";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { Not } from "typeorm";
const config = require("config");

@injectable()
export class CustomerController
  extends BaseController
  implements ICustomerController<any>
{
  constructor(@inject(ITYPES.Service) service: ICustomerService<any>) {
    super(service);
  }
  //Find all customers - exclude anonymous user
  async findAll(req: any, res: any, next: any): Promise<any> {
    try {
      let skip;
      let take;
      let { page } = req.query;
      if (page) {
        page = Number(page);
        skip = (page - 1) * 10;
        take = 10;
      }
      const totalRecords = await this.service.count();
      const result = await this.service.findAll({
        skip,
        take,
        where: {
          customerId: Not(anonymousUserId),
        },
      });
      res.json({
        data: result,
        dataTotal: result.length,
        page: page || 1,
        perPage: 10,
        pageTotal: Math.ceil(totalRecords / 10),
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfilePicture(req: any, res: any, next: any): Promise<any> {
    try {
      const pictureName = req.params.pictureName;
      if (!pictureName)
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Picture name is required"
        );
      const root = process.cwd();
      const path = `${root}/storage/media/customer-profile-picture/${pictureName}`;
      res.sendFile(path);
    } catch (error) {
      next(error);
    }
  }
  async uploadProfilePicture(req: any, res: any, next: any): Promise<any> {
    try {
      const pictureName = req.imagename;
      console.log("pictureName:", pictureName);
      const media_root = config.get("server").media_root;
      const api_version = config.get("API_VERSION");
      const root = process.cwd();
      const pictureURL = `${media_root}${api_version}/customer/profile-picture/${pictureName}`;
      console.log("pictureURL", pictureURL);
      res.json({
        message: "Upload ảnh thành công",
        picture_url: pictureURL,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginWithGoogleCallback(req: any, res: any, next: any): Promise<any> {
    try {
      const query = req.query;
      console.log("query:", query);
      console.log("callback state: ", query.state);
      const callBackToken = req.query.state;
      const sessionToken = req.session.loginWithGoogleToken;
      if (callBackToken !== sessionToken) {
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Login by google failed! Invalid state"
        );
      }
      if (query.error) {
        console.log("Error:" + query.error);
        res.status(400).json({ error: query.error });
      }
      let { tokens } = await oauth2Client.getToken(query.code);
      console.log("token:::", tokens);
      console.log("session state:::", req.session.loginWithGoogleToken);
      const result = await this.service.loginWithGoogleCallback(tokens);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async loginWithGoogle(req: any, res: any, next: any): Promise<any> {
    try {
      const { token, authorizationUrl } = await this.service.loginWithGoogle();
      req.session.loginWithGoogleToken = token;
      res.redirect(authorizationUrl);
    } catch (error) {
      next(error);
    }
  }

  //Recieve email from client and send verification email to that email
  async verifyEmailToken(req: any, res: any, next: any): Promise<any> {
    try {
      const token = req.query.token;
      const email = req.query.email;
      if (token == null || email == null)
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Can not verify email. Token or email is missing"
        );
      const resond = await this.service.verifyEmailToken(email, token);
      return res.json(resond);
    } catch (error) {
      next(error);
    }
  }
  async sendVertificationEmail(req: any, res: any, next: any): Promise<any> {
    try {
      console.log("request body: ", req.body);

      const email = req.body.email;
      const result = await this.service.sendVertificationEmail(email);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getInfoByToken(req: any, res: any, next: any): Promise<any> {
    try {
      const customerId = req.user.customerId;
      const result = await this.service.findOne({
        where: { customerId: customerId },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: any, res: any, next: any): Promise<any> {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const result = await this.service.login({ email, password });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Customer id is required");
      const customerId = req.params.id;
      const result = await this.service.findOne({
        where: { customerId: customerId },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async update(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      if (!req.body) throw new Error("Update data is required");
      if (req.user.role != "StaffLV1" && req.user.role != "StaffLV2") {
        if (req.user.customerId != req.params.id) {
          throw new BaseError(
            StatusCodes.UNAUTHORIZED,
            "fail",
            "You do not have permission to access this resource"
          );
        }
      }
      const data = req.body;
      const customerId = req.params.id;
      const result = await this.service.update({
        where: { customerId: customerId },
        data,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      const customerId = req.params.id;
      const result = await this.service.delete({
        where: { customerId: customerId },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
