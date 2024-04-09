import { Subject } from "@/auth/subjects";
import { airplaneController } from "@/container/airplane.container";
import { CreateAirplaneDto } from "@/dto/airplane/create-airplane.dto";
import { UpdateAirplaneDto } from "@/dto/airplane/update-airplane.dto";
import { UpdateSeatClassDto } from "@/dto/airplane/update-seat-class.dto";
import { ActionAuth } from "@/enums/action.auth.enum";
import { checkRole } from "@/middleware/check-role.middleware";
import { classValidate } from "@/middleware/class-validate.middleware";
import { authenticateJWT } from "@/middleware/jwt.authenticate.middleware";
import express from "express";

const airplaneRouter = express.Router();

airplaneRouter

  /**
   * @openapi
   * /airplane:
   *   post:
   *     summary: "Create a new airplane"
   *     tags:
   *      - airplane
   *     description: ""
   *     parameters: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/CreateAirplaneDto"
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/AirplaneSuccessResponse"
   */
  .post(
    "/",
    classValidate(CreateAirplaneDto),
    authenticateJWT,
    checkRole(ActionAuth.CREATE, Subject.Airplane),
    airplaneController.create.bind(airplaneController)
  )

  .put(
    "/update-seat-class",
    authenticateJWT,
    checkRole(ActionAuth.UPDATE, Subject.SeatAirplane),
    classValidate(UpdateSeatClassDto),
    airplaneController.updateSeatClass.bind(airplaneController)
  )

  /**
   * @openapi
   * /airplane/:id:
   *   put:
   *     summary: "Update a airplane by id"
   *     tags:
   *      - airplane
   *     description: "Update airplane infomation by id"
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric airplane ID to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/UpdareAirplaneDto"
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/AirplaneSuccessResponse"
   */
  .put(
    "/:id",
    authenticateJWT,
    checkRole(ActionAuth.UPDATE, Subject.Airplane),
    classValidate(UpdateAirplaneDto),
    airplaneController.update.bind(airplaneController)
  )

  /**
   * @openapi
   * /airplane/:id:
   *   delete:
   *     summary: "Delete a airplane by id"
   *     tags:
   *      - airplane
   *     description: ""
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric airplane ID to delete
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/AirplaneSuccessResponse"
   */
  .delete("/:id", 
  authenticateJWT,
  checkRole(ActionAuth.DELETE, Subject.Airplane),
  airplaneController.delete.bind(airplaneController))

  .get("/seats", airplaneController.getSeats.bind(airplaneController))

  /**
   * @openapi
   * /airplane/:id:
   *   get:
   *     summary: "Get a airplane info by id"
   *     tags:
   *      - airplane
   *     description: ""
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric airplane ID to get
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/AirplaneSuccessResponse"
   */
  .get("/:id", airplaneController.findOne.bind(airplaneController))

  /**
   * @openapi
   * /airplane:
   *   get:
   *     summary: "Get all airplane"
   *     tags:
   *      - airplane
   *     description: "Get all airplane"
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/AirplaneSuccessResponse"
   */
  .get("/", airplaneController.findAll.bind(airplaneController));

export default airplaneRouter;
