import redis from "@/utils/redis/redis.instance.util";

export async function deleteRedisKeyMatch (key: string) {
    const stream = redis.scanStream({
        match: key,
    });
    stream.on("data", (resultKeys) => {
        for (let i = 0; i < resultKeys.length; i++) {
            redis.del(resultKeys[i]);
        }
    });
    stream.on("end", () => {
        console.log("done delete all keys match with: ", key);
    });
}