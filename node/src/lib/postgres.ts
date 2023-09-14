import { Pool } from "pg";
import fs from "fs";

//postgresql:{user}:{password}@{host}:{port}/{db}

const databaseUrl =
  process.env.DATABASE_URL ||
  fs.readFileSync(process.env.DATABASE_URL_FILE, "utf8");

const pool = new Pool({ connectionString: databaseUrl });

const postgres = async ({
  queryString,
  valuesArr,
}: {
  queryString: string;
  valuesArr: string[];
}) => {
  const pg = await pool.connect();
  try {
    const res = await pg.query(queryString, valuesArr);
    return res;
  } catch (err) {
    throw err;
  } finally {
    pg.release();
  }
};

export { postgres };
