import { Pool } from "pg";
import fs from "fs";
import { Insert, Select } from "../types/types";

//postgresql:{user}:{password}@{host}:{port}/{db}

const databaseUrl =
  process.env.DATABASE_URL ||
  fs.readFileSync(process.env.DATABASE_URL_FILE, "utf8");

const pool = new Pool({ connectionString: databaseUrl });

const postgres = async ({ queryString, valuesArr }) => {
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

const insert = async ({ username, password, email }: Insert) => {
  const db = await pool.connect();
  try {
    const res = await db.query(
      "INSERT INTO users(username, password, email) VALUES($1::text, $2::text, $3::text)",
      [username, password, email]
    );
    return res.rowCount;
  } catch (err) {
    console.log(err);
  } finally {
    db.release();
  }
};

const select = async (o: Select) => {
  const db = await pool.connect();
  const [[key, value]] = Object.entries(o);
  const query = `SELECT * FROM users WHERE ${key}=$1`;

  try {
    const res = await db.query(query, [value]);
    console.log(res.rows);
    return res.rows;
  } catch (err) {
    console.log(err);
  } finally {
    db.release();
  }
};

export { insert, select };
