import express from "express";
import { Insert } from "./types/types";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/", (req, res) => {
  const { username, email, password }: Insert = req.body;
  if (!username || !password || !email)
    return res
      .status(400)
      .send({ message: "Missing username, password, and/or email" });

  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}.`);
});
