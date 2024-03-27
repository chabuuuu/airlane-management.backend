import { BaseService } from "@/service/base/base.service";
import { ICustomerService } from "@/service/interface/i.customer.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class CustomerService extends BaseService implements ICustomerService<any>{
    constructor(@inject(ITYPES.Repository) repository: ICustomerService<any>) {
        super(repository);
    } 
}