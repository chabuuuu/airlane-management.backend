import { CreateFlightDto } from '@/dto/flight/create-flight.dto'
import { UpdateFlightDto } from '@/dto/flight/update-flight.dto'
import { classValidate } from '@/middleware/class-validate.middleware'
import express from 'express'

const flightRouter = express.Router()

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
.post('/', classValidate(CreateFlightDto))

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
.put('/:id', classValidate(UpdateFlightDto))

/**
 * @openapi
 * /flight/{:id}:
 *   delete:
 *     summary: "Delete a flight by id"
 *     tags: 
 *      - flight 
 *     description: ""
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flight ID to delete
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DeleteSuccess"
 */
.delete('/:id', classValidate(CreateFlightDto))

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
.get('/:id')

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
.get('/')

export default flightRouter;