import { Airport } from "@/models/airport.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IAirportRepository } from "@/repository/interface/i.airport.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class AirportRepository
  extends BaseRepository<Airport>
  implements IAirportRepository<Airport>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Airport));
  }
  async _create(params: { data: any }): Promise<any> {
    try {
      const { data } = params;
      const count = await this._model.count({});
      const airport_country_code = data.country_code;
      data.airportCode = `${airport_country_code}${count + 1}`;
      const newInstance = await this._model.create(data);
      const result = await this._model.save(newInstance);
      if (result.hasOwnProperty("password")) {
        delete result.password;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
