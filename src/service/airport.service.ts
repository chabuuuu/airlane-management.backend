import { IAirportRepository } from "@/repository/interface/i.airport.repository";
import { BaseService } from "@/service/base/base.service";
import { IAirportService } from "@/service/interface/i.airport.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class AirportService extends BaseService implements IAirportService<any>{
    constructor(@inject(ITYPES.Repository) repository: IAirportRepository<any>) {
        super(repository);
      }
} 