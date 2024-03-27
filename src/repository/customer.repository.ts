import { Customer } from "@/models/customer.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IBaseRepository } from "@/repository/interface/i.base.repository";
import { ICustomerRepository } from "@/repository/interface/i.customer.repository";
import { ITYPES } from "@/types/interface.types";
import BaseError from "@/utils/error/base.error";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class CustomerRepository extends BaseRepository<Customer> implements ICustomerRepository<Customer>{
    constructor(@inject(ITYPES.Datasource) dataSource : DataSource){
        super(dataSource.getRepository(Customer))
    }
    async checkUnique(data: any): Promise<any> {
        if (data.email && await this._model.findOne({ where: { email: data.email } })) throw new BaseError(StatusCodes.BAD_REQUEST, 'fail', "Email already exists")
        if (data.phoneNumber && await this._model.findOne({ where: { phoneNumber: data.phoneNumber } })) throw new BaseError(StatusCodes.BAD_REQUEST, 'fail', "Phone number already exists")
        if (data.cccd && await this._model.findOne({ where: { cccd: data.cccd } })) throw new BaseError(StatusCodes.BAD_REQUEST, 'fail', "CCCD already exists")
    }

    async _create(params: { data: any; }): Promise<any> {
        try {
            const { data } = params
            await this.checkUnique(data)
            return await super._create(params)
        } catch (error) {
            throw error
        }
    }
    async _update(params: { where: any; data: any; }): Promise<any> {
        try {
            const { data } = params
            await this.checkUnique(data)
            return await super._update(params)
        } catch (error) {
            throw error
        }
    }
    async _findOneIncludePassword(params: { where?: any; }): Promise<any> {
        try {
            const { where } = params;
            const result = await this._model.findOne({
              where,
            });
            return result
          } catch (error) {
            throw error
          }
    }
}