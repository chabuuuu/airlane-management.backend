import { CreateAirplaneDto } from '@/dto/airplane/create-airplane.dto'
import { UpdateAirplaneDto } from '@/dto/airplane/update-airplane.dto'
import { classValidate } from '@/middleware/class-validate.middleware'
import express from 'express'

const airplaneRouter = express.Router()


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
.post('/', classValidate(CreateAirplaneDto))

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
.put('/:id', classValidate(UpdateAirplaneDto))

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
.delete('/:id')


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
.get('/:id')

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
.get('/', )

export default airplaneRouter