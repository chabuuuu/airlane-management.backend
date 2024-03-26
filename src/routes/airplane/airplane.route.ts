import { CreateAirplaneDto } from '@/dto/airplane/create-airplane.dto'
import { UpdateAirplaneDto } from '@/dto/airplane/update-airplane.dto'
import { classValidate } from '@/middleware/class-validate.middleware'
import express from 'express'

const airplaneRouter = express.Router()


airplaneRouter

.post('/', classValidate(CreateAirplaneDto))
/**
 * @openapi
 * /api/v1/airplane/:id:
 * put:
 *   description: ""
 *   parameters: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/CreateAccountDto"
 *   responses:
 *     "200":
 *       description: OK
 */
.put('/:id', classValidate(UpdateAirplaneDto))
.delete('/:id')


/**
 * @openapi
 * /api/v1/airplane/:id:
 *   get:
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CreateAccountDto"
 *   post:
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
 *   delete:
 *     description: ""
 *     parameters: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateAccountDto"
 *     responses:
 *       "200":
 *         description: OK
 */


.get('/')

export default airplaneRouter