import { customerService } from "@/container/customer.container";
import BaseError from "@/utils/error/base.error";
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
          }
          console.log('User: ', user);
          
          switch (user.role) {
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
                  console.log('User Login:::', findUser);
                  req.user = findUser;
                break;
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