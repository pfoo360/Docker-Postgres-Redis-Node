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
  await redis.connect();

  try {
    const res = await redis.set(key, value);
  } catch (err) {
    console.log(err);
  } finally {
    await redis.disconnect();
  }
};

const get = async ({ key }) => {
  await redis.connect();

  try {
    const value = await redis.get(key);
    console.log(value);
  } catch (err) {
    console.log(err);
  } finally {
    await redis.disconnect();
  }
};

export { set, get };
