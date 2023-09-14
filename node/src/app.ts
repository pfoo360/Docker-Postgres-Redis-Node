import express from "express";
import { postgres } from "./lib/postgres";
import { get, set } from "./lib/redis";
import { Insert } from "./types/types";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/query", async (req, res) => {
  const [[key, value]] = Object.entries(req.query);

  if (key !== "id" && key !== "username" && key !== "email")
    return res
      .status(400)
      .send({ message: "QUERY can only be 'id' or 'username' or 'email'" });

  //if querying by 'id' col we use '... WHERE id = ...' stmnt
  //if querying by any other col we use '... WHERE [col_name] ILIKE ...' smnt
  const querySubstring = `SELECT * FROM users WHERE ${key} ${
    key === "id" ? "=" : "ILIKE"
  } `;

  const redisResult = await get({ key: `${querySubstring}${value}` });
  if (redisResult)
    return res.status(200).send({
      message: "Result found in cache",
      result: JSON.parse(redisResult),
    });

  try {
    //if querying by any col besides 'id' we have to add % wildcard char
    const { rows } = await postgres({
      queryString: `${querySubstring}$1`,
      valuesArr: [`${key === "id" ? value : `%${value}%`}`],
    });

    if (!rows.length)
      return res.status(404).send({ message: "Does not exist" });

    await set({
      key: `${querySubstring}${value}`,
      value: JSON.stringify(rows),
    });

    res.status(200).send({ message: "Result found in DB", result: rows });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occured" });
  }
});

app.post("/", async (req, res) => {
  const { username, email, password }: Insert = req.body;
  if (!username || !password || !email)
    return res
      .status(400)
      .send({ message: "Missing username, password, and/or email" });

  const queryString =
    "INSERT INTO users(username, password, email) VALUES($1::text, $2::text, $3::text)";
  const valuesArr = [username, password, email];

  try {
    const pg_res = await postgres({ queryString, valuesArr });
    console.log(pg_res);

    res.status(200).send({ message: "INSERT success" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occured" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}.`);
});
