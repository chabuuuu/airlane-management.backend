import { accountController } from "@/container/account.container";
import { CreateAccountDto } from "@/dto/account/create-account.dto";
import { classValidate } from "@/middleware/class-validate.middleware";
import express from "express";
const accountRouter = express.Router();
accountRouter

/**
 * @swagger
 * /api/v1/account/create:
 *   post:
 *     summary: Create a account user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAccountDto'
 *    responses:
 *      200:
 *       description: The account was successfully created.
 *      content:
 *       application/json:
 *        schema:
 *        $ref: '#/components/schemas/CreateAccountDto'
 *         ...
*/
  .post(
    "/create",
    classValidate(CreateAccountDto),
    accountController.create.bind(accountController)
  )
  .get("/", accountController.findAll.bind(accountController));

export default accountRouter;
