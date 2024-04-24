import { Subject } from "@/auth/subjects";
import { flightController } from "@/container/flight.container";
import { CreateFlightDto } from "@/dto/flight/create-flight.dto";
import { UpdateFlightDto } from "@/dto/flight/update-flight.dto";
import { ActionAuth } from "@/enums/action.auth.enum";
import { getFlightsCaching } from "@/middleware/cache/flight.cache.middleware";
import { checkRole } from "@/middleware/check-role.middleware";
import { classValidate } from "@/middleware/class-validate.middleware";
import { authenticateJWT } from "@/middleware/jwt.authenticate.middleware";
import express from "express";

const flightRouter = express.Router();

flightRouter
  /**
   * @openapi
   * /flight:
   *   post:
   *     summary: "Create a new flight"
   *     tags:
   *      - flight
   *     description: ""
   *     parameters: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/CreateFlightDto"
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/CreateSuccess"
   */
  .post(
    "/",
    authenticateJWT,
    checkRole(ActionAuth.CREATE, Subject.Flight),
    classValidate(CreateFlightDto),
    flightController.create.bind(flightController)
  )

  .put(
    "/set-not-started/:id",
    authenticateJWT,
    checkRole(ActionAuth.UPDATE, Subject.Flight),
    flightController.updateFlightOnNotStart.bind(flightController)
  )

  .put(
    "/set-finish/:id",
    authenticateJWT,
    checkRole(ActionAuth.UPDATE, Subject.Flight),
    flightController.updateFlightOnFinish.bind(flightController)
  )

  .put(
    "/set-in-progress/:id",
    authenticateJWT,
    checkRole(ActionAuth.UPDATE, Subject.Flight),
    flightController.updateFlightOnProcess.bind(flightController)
  )

  .put(
    "/set-cancel/:id",
    authenticateJWT,
    checkRole(ActionAuth.UPDATE, Subject.Flight),
    flightController.updateFlightOnCancel.bind(flightController)
  )

  /**
   * @openapi
   * /flight/{:id}:
   *   put:
   *     summary: "Update a flight by id"
   *     tags:
   *      - flight
   *     description: "Update flight infomation by id"
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Flight ID to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/UpdateFlightDto"
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/UpdateSuccess"
   */
  .put(
    "/:id",
    authenticateJWT,
    checkRole(ActionAuth.UPDATE, Subject.Flight),
    classValidate(UpdateFlightDto),
    flightController.update.bind(flightController)
  )

  .get(
    "/find-available-flight",
    getFlightsCaching,
    flightController.findAvailableFlight.bind(flightController)
  )

  /**
   * @openapi
   * /flight/{:id}:
   *   get:
   *     summary: "Get a flight info by id"
   *     tags:
   *      - flight
   *     description: ""
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Flight ID to get
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/GetOneFlightSuccessResponse"
   */
  .get(
    "/:id",
    flightController.findOne.bind(flightController)
  )

  /**
   * @openapi
   * /flight:
   *   get:
   *     summary: "Get all flights"
   *     tags:
   *      - flight
   *     description: "Get all flights"
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/GetOneFlightSuccessResponse"
   */
  .get(
    "/",
    getFlightsCaching,
    flightController.findAll.bind(flightController)
  );

export default flightRouter;
