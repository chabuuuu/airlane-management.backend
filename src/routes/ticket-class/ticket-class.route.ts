import { ticketClassController } from "@/container/ticket-class.container";
import { CreateTicketClassDto } from "@/dto/ticket-class/create-ticket-class.dto";
import { UpdateTicketClassPriceDto } from "@/dto/ticket-class/update-ticket-class-price.dto";
import { classValidate } from "@/middleware/class-validate.middleware";
import { authenticateJWT } from "@/middleware/jwt.authenticate.middleware";
import express from "express";

const ticketClassRouter = express.Router();

ticketClassRouter
  .post(
    "/create",
    authenticateJWT,
    classValidate(CreateTicketClassDto),
    ticketClassController.create.bind(ticketClassController)
  )
  .get("/list", ticketClassController.findAll.bind(ticketClassController))
  .put(
    "/update/:className",
    authenticateJWT,
    classValidate(UpdateTicketClassPriceDto),
    ticketClassController.update.bind(ticketClassController)
  )
  .delete(
    "/delete/:className",
    authenticateJWT,
    ticketClassController.delete.bind(ticketClassController)
  );
export default ticketClassRouter;
