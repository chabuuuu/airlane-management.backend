import redis from "@/utils/redis/redis.instance.util"

export const getCityOfCountryCaching = async (req: any, res: any, next: any) => {
    try {
        const country = req.query.country;
        const cacheResults = await redis.get('city_of_' + country);
        if (cacheResults){
            res.json(JSON.parse(cacheResults));
        }else{
            next();
        }
    } catch (error) {
        next();
    }
} 