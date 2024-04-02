import { customerService } from "@/container/customer.container";
import { staffService } from "@/container/staff.container";
import BaseError from "@/utils/error/base.error";
import { log } from "console";
import { StatusCodes } from "http-status-codes";

const jwt = require('jsonwebtoken');

export async function authenticateJWT(req: any, res: any, next: any) {
    try {
    var token: string = req.header('Authorization');
    if (!token) {
        throw new BaseError(StatusCodes.UNAUTHORIZED, 'fail', 'You need to login first')
    }
      if (token != null){
        token = token.split('Bearer ')[1];
      }
    console.log(token);
      await jwt.verify(
        token,
        process.env.JWT_SECRET,
        async (err: any, user: any) => {
          if (err) {
            console.log('token error: ', err);
            throw new BaseError(StatusCodes.UNAUTHORIZED, 'fail', 'You need to login first')
          }
          console.log('User: ', user);
          log('user role:', user.role)
          const user_role = user.role;
          switch (user_role) {
            case 'Customer':
                const findUser = await customerService.findOneIncludePassword({
                    where: {
                      customerId: user.id,
                    },
                  });
                  if (!findUser) {
                    throw new BaseError(StatusCodes.NOT_FOUND, 'fail', 'User not found')
                  }
                  if (findUser.password != user.password) {
                    throw new BaseError(StatusCodes.BAD_REQUEST, 'fail', 'Password is incorrect')
                  }
                  if (findUser.email_verified == false) {
                    throw new BaseError(StatusCodes.BAD_REQUEST, 'fail', 'Email not verified')
                  }
                  findUser.role = 'Customer';
                  console.log('User Login:::', findUser);
                  req.user = findUser;
                break;
            case 'Staff_LV1':              
              const findStaff = await staffService.findOneIncludePassword({
                where: {
                  staffId: user.id,
                },
              });
              if (!findStaff) {
                throw new BaseError(StatusCodes.NOT_FOUND, 'fail', 'User not found')
              }
              if (findStaff.password != user.password) {
                throw new BaseError(StatusCodes.BAD_REQUEST, 'fail', 'Password is incorrect')
              }
              console.log('Staff Login:::', findStaff);
              req.user = findStaff;
              case 'Staff_LV2':              
              const findStaffLV2 = await staffService.findOneIncludePassword({
                where: {
                  staffId: user.id,
                },
              });
              if (!findStaffLV2) {
                throw new BaseError(StatusCodes.NOT_FOUND, 'fail', 'User not found')
              }
              if (findStaffLV2.password != user.password) {
                throw new BaseError(StatusCodes.BAD_REQUEST, 'fail', 'Password is incorrect')
              }
              console.log('Staff Login:::', findStaffLV2);
              req.user = findStaffLV2;
            default:
                break;
          }  
          next();
        },
      );
    } catch (error: any) {
      next(error);
    }
  }