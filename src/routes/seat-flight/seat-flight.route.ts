import { seatFlightController } from "@/container/seat-flight.container";
import { ChangeSeatsClassDto } from "@/dto/seat-flight/change-seats-class.dto";
import { checkRole } from "@/middleware/check-role.middleware";
import { classValidate } from "@/middleware/class-validate.middleware";
import { authenticateJWT } from "@/middleware/jwt.authenticate.middleware";
import express from "express";

const seatFlightRouter = express.Router();

seatFlightRouter

  .get(
    "/seat-list",
    seatFlightController.findAllByFlightId.bind(seatFlightController)
  )
  .put(
    "/change-class",
    authenticateJWT,
    classValidate(ChangeSeatsClassDto),
    seatFlightController.changeSeatsClass.bind(seatFlightController)
  );

export default seatFlightRouter;
