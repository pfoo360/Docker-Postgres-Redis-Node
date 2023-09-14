import express from "express";
import { postgres } from "./lib/postgres";
import { Insert } from "./types/types";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/query", (req, res) => {
  console.log(req.query);
  res.send("Hello world!");
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
