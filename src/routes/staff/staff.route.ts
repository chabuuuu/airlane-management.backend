import { Subject } from "@/auth/subjects";
import { staffController } from "@/container/staff.container";
import { CreateStaffDto } from "@/dto/staff/create-staff.dto";
import { LoginStaffDto } from "@/dto/staff/login-staff.dto";
import { UpdateStaffDto } from "@/dto/staff/update-staff.dto";
import { checkRole } from "@/middleware/check-role.middleware";
import { classValidate } from "@/middleware/class-validate.middleware";
import { authenticateJWT } from "@/middleware/jwt.authenticate.middleware";
import express from "express";

const staffRouter = express.Router();

staffRouter

  .post(
    "/login",
    classValidate(LoginStaffDto),
    staffController.login.bind(staffController)
  )
  .post(
    "/",
    authenticateJWT,
    checkRole("create", Subject.Staff_LV2),
    classValidate(CreateStaffDto),
    staffController.create.bind(staffController)
  )

  .put(
    "/:id",
    authenticateJWT,
    checkRole("update", Subject.Staff_LV2),
    classValidate(UpdateStaffDto),
    staffController.update.bind(staffController)
  )

  .delete(
    "/:id",
    authenticateJWT,
    checkRole("delete", Subject.Staff_LV2),
    staffController.delete.bind(staffController)
  )

  .get(
    "/me",
    authenticateJWT,
    staffController.getInfoByToken.bind(staffController)
  )
  .get(
    "/:id",
    authenticateJWT,
    checkRole("read", Subject.Staff_LV2),
    staffController.findOne.bind(staffController)
  )
  .get(
    "/",
    authenticateJWT,
    checkRole("read", Subject.Staff_LV1),
    staffController.findAll.bind(staffController)
  );

export default staffRouter;
