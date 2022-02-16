import Redis from "ioredis";
import { promisify } from "util";

const redisClient = new Redis(process.env.REDIS_PORT);

function getRedis(value: string): Promise<string> {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value) as Promise<string>;
}

function setRedis(key: string, value: string) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
}

export { redisClient, getRedis, setRedis };
