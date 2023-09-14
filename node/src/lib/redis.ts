import { createClient } from "redis";
import fs from "fs";

//redis://{user}:{password}@{host}:{port}/{db}

const redisUrl =
  process.env.REDIS_URL || fs.readFileSync(process.env.REDIS_URL_FILE, "utf8");

const redis = createClient({
  url: redisUrl,
});

redis.on("error", (err) => console.log("Redis Client Error", err));

const set = async ({ key, value }) => {
  try {
    await redis.connect();
    const res = await redis.set(key, value);
    console.log(res);
  } catch (err) {
    console.log("REDIS SET ERROR");
    console.log(err);
  } finally {
    await redis.disconnect();
  }
};

const get = async ({ key }) => {
  try {
    await redis.connect();
    const value = await redis.get(key);
    return value;
  } catch (err) {
    console.log("REDIS GET ERROR");
    console.log(err);
  } finally {
    await redis.disconnect();
  }
};

export { set, get };
