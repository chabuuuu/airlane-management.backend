import redis from "@/utils/redis/redis.instance.util"

export const getCountryCodeCaching = async (req: any, res: any, next: any) => {
    try {
        const cacheResults = await redis.get('country_code');
        if (cacheResults){
            res.json(JSON.parse(cacheResults));
        }else{
            next();
        }
    } catch (error) {
        next();
    }
} 