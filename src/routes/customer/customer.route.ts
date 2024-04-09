import { Subject } from "@/auth/subjects";
import { customerController } from "@/container/customer.container";
import { CreateCustomerDto } from "@/dto/customer/create-customer.dto";
import { CustomerLoginDto } from "@/dto/customer/customer-login.dto";
import { SendVerifyEmailDto } from "@/dto/customer/send-verify-email.dto";
import { UpdateCustomerDto } from "@/dto/customer/update-customer.dto";
import { checkRole } from "@/middleware/check-role.middleware";
import { classValidate } from "@/middleware/class-validate.middleware";
import { authenticateJWT } from "@/middleware/jwt.authenticate.middleware";
import { uploadPicture } from "@/utils/media/upload-picture.multer";
import express from "express";

const customerRouter = express.Router();

customerRouter
.get("/profile-picture/:pictureName", customerController.getProfilePicture.bind(customerController))
.get(
    "/google-oauth2callback",
    customerController.loginWithGoogleCallback.bind(customerController)
  )
  .post("/upload-profile-picture",
    uploadPicture("customer-profile-picture"),
    customerController.uploadProfilePicture.bind(customerController)
    )
  .post(
    "/send-verify-email",
    customerController.sendVertificationEmail.bind(customerController)
  )
  .get(
    "/login-with-google",
    customerController.loginWithGoogle.bind(customerController)
  )
  .post(
    "/login",
    classValidate(CustomerLoginDto),
    customerController.login.bind(customerController)
  )
  .post(
    "",
    classValidate(CreateCustomerDto),
    customerController.create.bind(customerController)
  )
  .put(
    "/:id",
    authenticateJWT,
    classValidate(UpdateCustomerDto),
    customerController.update.bind(customerController)
  )
  .delete(
    "/:id",
    authenticateJWT,
    checkRole("delete", Subject.Customer),
    customerController.delete.bind(customerController)
  )
  .get(
    "/verify-email-token",
    customerController.verifyEmailToken.bind(customerController)
  )
  .get(
    "/me",
    authenticateJWT,
    customerController.getInfoByToken.bind(customerController)
  )
  .get(
    "/:id",
    authenticateJWT,
    checkRole("read", Subject.Customer),
    customerController.findOne.bind(customerController)
  )
  .get(
    "",
    authenticateJWT,
    checkRole("read", Subject.Customer),
    customerController.findAll.bind(customerController)
  );

export default customerRouter;
