import { customerController } from '@/container/customer.container'
import { CreateCustomerDto } from '@/dto/customer/create-customer.dto'
import { CustomerLoginDto } from '@/dto/customer/customer-login.dto'
import { UpdateCustomerDto } from '@/dto/customer/update-customer.dto'
import { classValidate } from '@/middleware/class-validate.middleware'
import express from 'express'

const customerRouter = express.Router()

customerRouter

.post('/login', classValidate(CustomerLoginDto),customerController.login.bind(customerController))
.post('', classValidate(CreateCustomerDto), customerController.create.bind(customerController))
.put('/:id', classValidate(UpdateCustomerDto), customerController.update.bind(customerController))
.delete('/:id', customerController.delete.bind(customerController))
.get('/:id', customerController.findOne.bind(customerController))
.get('', customerController.findAll.bind(customerController))

export default customerRouter