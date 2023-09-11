import { Pool } from "pg";
import fs from "fs";

//postgresql:{user}:{password}@{host}:{port}/{db}

const databaseUrl =
  process.env.DATABASE_URL ||
  fs.readFileSync(process.env.DATABASE_URL_FILE, "utf8");

const pool = new Pool({ connectionString: databaseUrl });

const insert = async ({ username, password, email }) => {
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

const select = async ({ value }) => {
  const db = await pool.connect();
  try {
    const res = await db.query("SELECT * FROM users WHERE username=$1", [
      value,
    ]);
    return res.rows;
  } catch (err) {
    console.log(err);
  } finally {
    db.release();
  }
};

export { insert, select };
