import { CreateTicketDto } from '@/dto/ticket/create-ticket.dto'
import { UpdateTicketDto } from '@/dto/ticket/update-ticket.dto'
import { classValidate } from '@/middleware/class-validate.middleware'
import express from 'express'

const ticketRouter = express.Router()

ticketRouter

/**
 * @openapi
 * /ticket:
 *   post:
 *     summary: "Create a new ticket"
 *     tags: 
 *      - ticket 
 *     description: ""
 *     parameters: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateTicketDto"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CreateSuccess"
 */
.post('/', classValidate(CreateTicketDto))


/**
 * @openapi
 * /ticket/{:id}:
 *   put:
 *     summary: "Update a ticket by id"
 *     tags: 
 *      - ticket 
 *     description: "Update ticket infomation by id"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ticket ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateTicketDto"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UpdateSuccess"
 */
.put('/:id', classValidate(UpdateTicketDto))


/**
 * @openapi
 * /ticket/{:ticketId}:
 *   delete:
 *     summary: "Delete a ticket by id"
 *     tags:
 *       - ticket
 *     description: ""
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         schema:
 *           type: string
 *         required: true
 *         description: ticket ID to delete
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DeleteSuccess"
 */
.delete('/:id')

/**
 * @openapi
 * /ticket/{:ticketId}:
 *   get:
 *     summary: "Get a ticket info by id"
 *     tags: 
 *      - ticket 
 *     description: ""
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ticket ID to get
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetTicketById"
 */
.get('/:id')

/**
 * @openapi
 * /ticket:
 *   get:
 *     summary: "Get all tickets"
 *     tags: 
 *      - ticket 
 *     description: "Get all tickets"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/GetTicketById"
 */
.get('/')

export default ticketRouter