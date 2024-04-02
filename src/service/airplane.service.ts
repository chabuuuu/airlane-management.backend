import { IAirplaneRepository } from "@/repository/interface/i.airplane.repository";
import { BaseService } from "@/service/base/base.service";
import { IAirplaneService } from "@/service/interface/i.airplane.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class AirplaneService extends BaseService implements IAirplaneService<any>{
    constructor(@inject(ITYPES.Repository) repository: IAirplaneRepository<any>) {
        super(repository);
      }
}