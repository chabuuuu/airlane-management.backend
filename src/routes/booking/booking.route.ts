import { Subject } from "@/auth/subjects";
import { bookingController } from "@/container/booking.container";
import { CreateBookingDto } from "@/dto/booking/create-booking.dto";
import { ActionAuth } from "@/enums/action.auth.enum";
import { checkRole } from "@/middleware/check-role.middleware";
import { classValidate } from "@/middleware/class-validate.middleware";
import { authenticateJWT } from "@/middleware/jwt.authenticate.middleware";
import express from "express";

const bookingRouter = express.Router();

bookingRouter

  .get(
    "/list",
    authenticateJWT,
    checkRole(ActionAuth.READ, Subject.Booking),
    bookingController.getAllBooking.bind(bookingController)
  )
  .get(
    "/me",
    authenticateJWT,
    bookingController.getMyBooking.bind(bookingController)
  )
  .get(
    "/detail/:id",
    authenticateJWT,
    bookingController.findOne.bind(bookingController)
  )
  .post(
    "/create",
    classValidate(CreateBookingDto),
    authenticateJWT,
    bookingController.create.bind(bookingController)
  )
  .put(
    "/cancel-booking/:id",
    authenticateJWT,
    checkRole(ActionAuth.UPDATE, Subject.Booking),
    bookingController.cancelBooking.bind(bookingController)
  )
  .put(
    "/update-booking",
    authenticateJWT,
    bookingController.update.bind(bookingController)
  );

export default bookingRouter;
