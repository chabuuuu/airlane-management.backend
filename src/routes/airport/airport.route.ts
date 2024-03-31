import { CreateAirportDto } from '@/dto/airport/create-airport.dto'
import { UpdateAirportDto } from '@/dto/airport/update-airport.dto'
import { classValidate } from '@/middleware/class-validate.middleware'
import express from 'express'

const airportRouter = express.Router()

airportRouter

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
 *               $ref: "#/components/schemas/CreateAirportSuccess"
 */
.post('/', classValidate(CreateAirportDto))

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
.put('/:id', classValidate(UpdateAirportDto))

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
.delete('/:id', classValidate(UpdateAirportDto))

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
.get('/:id')

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
.get('/')

export default airportRouter