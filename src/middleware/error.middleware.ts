import BaseError from "@/utils/error/base.error";
import { StatusCodes } from "http-status-codes";
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from "typeorm";

export const errorHanlder = (error: any, req: any, res: any, next: any) => {
  console.log("Error::: " + error);
  console.log('error detail', error.detail);
  
  let message = (error as any).message.message;
  let code = "HttpException";
  let status = StatusCodes.INTERNAL_SERVER_ERROR;
  let statusCode = 400;
  switch (error.constructor) {
    case BaseError:
      error.statusCode = error.statusCode || 500;
      error.status = error.status || "error";

      statusCode = error.statusCode;
      status = error.statusCode;
      message = error.message;
      code = "base_error";
      // res.status(error.statusCode).json({
      //     statusCode: error.statusCode,
      //     status: error.status,
      //     message: error.message,
      // });
      break;
    case QueryFailedError:
      status = StatusCodes.UNPROCESSABLE_ENTITY;
      message = (error as any).message;
      if (
        error.hasOwnProperty("detail") &&
        (error as any).detail !== undefined
      ) {
        message += "- detail: " + (error as any).detail;
      }
      statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      code = (error as any).code;
      break;
    case EntityNotFoundError:
      status = StatusCodes.UNPROCESSABLE_ENTITY;
      statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      message = (error as EntityNotFoundError).message;
      code = (error as any).code;
      break;
    case CannotCreateEntityIdMapError:
      status = StatusCodes.UNPROCESSABLE_ENTITY;
      statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      message = (error as CannotCreateEntityIdMapError).message;
      code = (error as any).code;
      break;
    default:
      status = StatusCodes.INTERNAL_SERVER_ERROR;
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      message = error.message || error;
      code = error.code;
      break;
  }
  res.status(status).json({
    statusCode: statusCode,
    message: message,
    code: code,
  });
};
