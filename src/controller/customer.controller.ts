import { BaseController } from "@/controller/base/base.controller";
import { ICustomerController } from "@/controller/interface/customer.controller";
import { ICustomerService } from "@/service/interface/i.customer.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class CustomerController extends BaseController implements ICustomerController<any>{
    constructor(
        @inject(ITYPES.Service) service: ICustomerService<any>
    ) {
        super(service)
    }

    async findOne(req: any, res: any, next: any): Promise<any> {
        try {
            if (!req.params.id) throw new Error("Customer id is required");
            const customerId = req.params.id;
            const result = await this.service.findOne({ where: { customerId: customerId }});
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async update(req: any, res: any, next: any): Promise<any> {
        try {
            if (!req.params.id) throw new Error("Id is required")
            if (!req.body) throw new Error("Update data is required");
            const data = req.body;
            const customerId = req.params.id;
            const result = await this.service.update({ where: { customerId: customerId }, data });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: any, res: any, next: any): Promise<any> {
        try {
            if (!req.params.id) throw new Error("Id is required");
            const customerId = req.params.id;
            const result = await this.service.delete({ where: { customerId: customerId }});
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}