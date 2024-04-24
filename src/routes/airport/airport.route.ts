import { Subject } from "@/auth/subjects";
import { airportController } from "@/container/airport.container";
import { CreateAirportDto } from "@/dto/airport/create-airport.dto";
import { UpdateAirportDto } from "@/dto/airport/update-airport.dto";
import { ActionAuth } from "@/enums/action.auth.enum";
import { getCityOfCountryCaching } from "@/middleware/cache/city-of-country.cache.middleware";
import { getCountryCodeCaching } from "@/middleware/cache/country.cache.middleware";
import { checkRole } from "@/middleware/check-role.middleware";
import { classValidate } from "@/middleware/class-validate.middleware";
import { authenticateJWT } from "@/middleware/jwt.authenticate.middleware";
import { uploadAirportPicture } from "@/utils/media/upload-airport-picture.multer";
import express from "express";

const airportRouter = express.Router();

airportRouter

  .post(
    "/upload-picture",
    authenticateJWT,
    checkRole(ActionAuth.UPDATE, Subject.Airport),
    uploadAirportPicture,
    airportController.uploadPicture.bind(airportController)
  )

  /**
   * @openapi
   * /airport:
   *   post:
   *     summary: "Create a new airport"
   *     tags:
   *      - airport
   *     description: ""
   *     parameters: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/CreateAirportDto"
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
    classValidate(CreateAirportDto),
    authenticateJWT,
    checkRole(ActionAuth.CREATE, Subject.Airport),
    airportController.create.bind(airportController)
  )

  /**
   * @openapi
   * /airport/{:id}:
   *   put:
   *     summary: "Update a airport by id"
   *     tags:
   *      - airport
   *     description: "Update airport infomation by id"
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: airport ID to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/UpdateAirportDto"
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
    classValidate(UpdateAirportDto),
    authenticateJWT,
    checkRole(ActionAuth.UPDATE, Subject.Airport),
    airportController.update.bind(airportController)
  )

  /**
   * @openapi
   * /airport/{:id}:
   *   delete:
   *     summary: "Delete a airport by id"
   *     tags:
   *       - airport
   *     description: ""
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: airport ID to delete
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/DeleteSuccess"
   */
  .delete(
    "/:id",
    classValidate(UpdateAirportDto),
    authenticateJWT,
    checkRole(ActionAuth.DELETE, Subject.Airport),
    airportController.delete.bind(airportController)
  )

  .get("/picture/:pictureName", airportController.getPicture.bind(airportController))

  .get("/city", getCityOfCountryCaching, airportController.getCityOfCountry.bind(airportController))

  .get("/country", getCountryCodeCaching, airportController.getCountry.bind(airportController))

  /**
   * @openapi
   * /airport/{:id}:
   *   get:
   *     summary: "Get a airport info by id"
   *     tags:
   *      - airport
   *     description: ""
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: airport ID to get
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/GetAirportById"
   */
  .get("/:id", airportController.findOne.bind(airportController))

  /**
   * @openapi
   * /airport:
   *   get:
   *     summary: "Get all airports"
   *     tags:
   *       - airport
   *     description: "Get all airports"
   *     responses:
   *       "200":
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/GetAirportById"
   */
  .get("/", airportController.findAll.bind(airportController));

export default airportRouter;
