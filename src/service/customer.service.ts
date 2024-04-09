import { BaseService } from "@/service/base/base.service";
import { ICustomerService } from "@/service/interface/i.customer.service";
import { ITYPES } from "@/types/interface.types";
import { transporter } from "@/utils/email-sender/transporter.nodemailer";
import BaseError from "@/utils/error/base.error";
import oauth2Client from "@/utils/google-api/google-oauth2.client.util";
import redis from "@/utils/redis/redis.instance.util";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import axios from "axios";
const jwt = require("jsonwebtoken");
const config = require('config');
var CryptoJS = require("crypto-js");

@injectable()
export class CustomerService
  extends BaseService
  implements ICustomerService<any>
{
  constructor(@inject(ITYPES.Repository) repository: ICustomerService<any>) {
    super(repository);
  }
  async loginWithGoogleCallback(tokens: any): Promise<any> {
    const {access_token} = tokens
    if (!access_token){
      throw new BaseError(StatusCodes.BAD_REQUEST, 'fail', 'Login by google failed! Can not get access token')
    }
    const {data} = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`);         
    console.log('data:', data);
    if (!data.hasOwnProperty("email")){
      throw new BaseError(StatusCodes.BAD_REQUEST, 'fail', 'Login by google failed! Account does not exists')
    }
    const email = data.email;
    const user = await this.repository._findOneIncludePassword({ where: { email: email } });
    if (!user){
      throw new BaseError(StatusCodes.BAD_REQUEST, 'fail', 'Login by google failed! Account does not exists')
    }
    return await this.login({email: user.email, password: user.password})
  } 
  async loginWithGoogle(): Promise<any> {
    try {
      const token = CryptoJS.lib.WordArray.random(16).toString();
      const scopes = [
        'https://www.googleapis.com/auth/userinfo.email'
      ];
      
      const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
        state: token
      });
      console.log('Authorization URL:', authorizationUrl);
      
        return {token, authorizationUrl}
    } catch (error) {
      throw error
    }
  }
  async verifyEmailToken(email: string, token: string): Promise<any> {
    try {
      const tokenInRedis = await redis.get(email);
      if (!tokenInRedis)
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Email verify expired. Please try again"
        );
      if (token !== tokenInRedis) {
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Can not verify email. Token is incorrect"
        );
      }
      await this.repository._update({
        where: { email: email },
        data: { emailValidated: true },
      });
      redis.del(email);
      return {
        status: 'suscess',
        message: 'Email verified! You can login now.',
      };
    } catch (error) {
      throw error
    }
  }
  async sendVertificationEmail(email: string): Promise<any> {
    try {
      const token = CryptoJS.lib.WordArray.random(16).toString();
      console.log(email);
      if (await redis.get(email)) {
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Email was sent. Please check your email and try again in 5 minutes"
        );
      }
      const user = await this.repository._findOne({ where: { email: email } });
      console.log("user", user);

      if (!user)
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Email not regiter with any account"
        );
      const fiveMinuteInSeconds = 60 * 5;
      redis.set(user.email, token, "EX", fiveMinuteInSeconds);
      const server_config = config.get('server');
      const api_version = config.get('API_VERSION');
      const root_url = `${server_config.verify_email}${api_version}`
      const mailOptions = {
        from: {
          name: "CS Airlines",
          address: process.env.EMAIL_USERNAME,
        },
        to: email,
        subject: "Xác thực email",
        text: `Hãy nhấn vào đường link này để xác thực email của bạn: ${root_url}/customer/verify-email-token?email=${email}&token=${token}`,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Email sent: ",result);

      return {
        status: "suscess",
        message: `Email was sent to ${email}`,
      } as any;
    } catch (error) {      
      throw error;
    }
  }
  async findOneIncludePassword(params: any): Promise<any> {
    try {
      return await this.repository._findOneIncludePassword(params);
    } catch (error) {
      throw error;
    }
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
        token: "Bearer " + token,
      } as any;
    } catch (error) {
      throw error;
    }
  }
}
