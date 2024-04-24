import { BaseController } from "@/controller/base/base.controller";
import { IAirportController } from "@/controller/interface/i.airport.controller";
import { IAirportService } from "@/service/interface/i.airport.service";
import { ITYPES } from "@/types/interface.types";
import { isValidCityName } from "@/utils/city/check-valid-city-name.util";
import { findCountryCode } from "@/utils/country/check-valid-country-name.util";
import BaseError from "@/utils/error/base.error";
import redis from "@/utils/redis/redis.instance.util";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
const fs = require("fs-extra");
const config = require("config");

@injectable()
export class AirportController
  extends BaseController
  implements IAirportController<any>
{
  constructor(@inject(ITYPES.Service) service: IAirportService<any>) {
    super(service);
  }
  async uploadPicture(req: any, res: any, next: any): Promise<any> {
    try {
      const pictureName = req.imagename;
      console.log("pictureName:", pictureName);
      const media_root = config.get("server").media_root;
      const api_version = config.get("API_VERSION");
      const root = process.cwd();
      const pictureURL = `${media_root}${api_version}/airport/picture/${pictureName}`;
      console.log("pictureURL", pictureURL);
      res.json({
        message: "Upload ảnh thành công",
        picture_url: pictureURL,
      });
    } catch (error) {
      next(error);
    }
  }
  async getPicture(req: any, res: any, next: any): Promise<any> {
    try {
      const pictureName = req.params.pictureName;
      if (!pictureName)
        throw new BaseError(
          StatusCodes.BAD_REQUEST,
          "fail",
          "Picture name is required"
        );
      const root = process.cwd();
      const path = `${root}/storage/media/airport-picture/${pictureName}`;
      res.sendFile(path);
    } catch (error) {
      next(error);
    }
  }
  async findOne(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      const id = req.params.id;
      const result = await this.service.findOne({ where: { airportId: id } });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      const id = req.params.id;
      const result = await this.service.delete({ where: { airportId: id } });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async update(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id is required");
      if (!req.body) throw new Error("Update data is required");
      const data = req.body;
      const id = req.params.id;
      if (data.country) {
        if (!data.city) throw new BaseError(400, "fail", "City is required");
        const country_code = await findCountryCode(data.country);
        const city = data.city;
        if (!(await isValidCityName(city, country_code))) {
          throw new BaseError(
            400,
            "fail",
            `This city: ${city} is not in this country: ${data.country}`
          );
        }
      }
      const result = await this.service.update({
        where: { airportId: id },
        data,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async create(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.body) throw new Error("Data is required");
      let data = req.body;
      const country = data.country;
      const country_code = await findCountryCode(country);
      if (!(await isValidCityName(data.city, country_code))) {
        throw new BaseError(400, "fail", "City name is invalid");
      }
      data.country_code = country_code;
      const result = await this.service.create({ data });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async getCityOfCountry(req: any, res: any, next: any): Promise<any> {
    try {
      const { country } = req.query;
      const thirtyMinuteInSecond = 1800;
      if (!country) {
        throw new BaseError(400, "fail", "Country code is required");
      }
      const filePath = "./cities.json";
      const cities = await fs.readJson(filePath);
      const result = cities[country].cities
      redis.set("city_of_" + country, JSON.stringify(result), "EX", thirtyMinuteInSecond);
      res.json(result);
    } catch (error) {
      if (error instanceof TypeError) {
        next(new BaseError(400, "fail", "Country code is invalid"));
      }
      next(error);
    }
  }

  async getCountry(req: any, res: any, next: any): Promise<any> {
    try {
      const filePath = "./countries.json";
      const countries = await fs.readJson(filePath);
      await redis.set("country_code", JSON.stringify(countries));
      return res.json(countries);
    } catch (error) {
      next(error);
    }
  }
}
