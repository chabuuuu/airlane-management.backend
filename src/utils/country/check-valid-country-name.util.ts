import BaseError from "@/utils/error/base.error";

export async function findCountryCode (countryName: any) :Promise<any>{
    const fs = require("fs-extra");

    const filePath = "./countries.json";
    const countries : any = await fs.readJson(filePath);  
    for (let country of countries) {
      if (countryName === country.name){
        return country.code;
      }
    }
    throw new BaseError(400, "fail", "Country name is invalid");
}