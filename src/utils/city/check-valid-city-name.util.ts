export async function isValidCityName (cityName: string, countryCode: string) :Promise<boolean>{
    const fs = require("fs-extra");
    console.log(cityName, countryCode);
    
    const filePath = "./cities.json";
    const cities = await fs.readJson(filePath);
    const cityOfCountry = cities[countryCode].cities;
    //console.log(cityOfCountry);
    
    for (let city of cityOfCountry) {
        if (cityName === city){
            console.log('hello');
            
            console.log(cityName, city);
            
            return true;
        }
    }
    return false;
}