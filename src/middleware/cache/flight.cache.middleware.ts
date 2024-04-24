import redis from "@/utils/redis/redis.instance.util";

export const getFlightsCaching = async (req: any, res: any, next: any) => {
  try {
    let query = req.query;
    query = JSON.stringify(query);
    console.log("query: ", "flight_query:" + query);
    
    const cacheResults = await redis.get("flight_query:" + query.toString());
    if (cacheResults) {
      res.json({ from: "cache", data: JSON.parse(cacheResults) });
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};
