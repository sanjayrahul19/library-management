import express from "express";
const app = express();
const PORT = 8000;
import { createClient } from "redis";
import { connectDB } from "./config/db";
import { router } from "./router/router";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/", router);

export let client;

(async () => {
  client = createClient();

  client.on("error", (err) => {
    console.log(err);
  });

  await client.connect();

  const info = await client.info();
  console.log(info.memory);

  await client.config("set", "maxmemory", "10mb");

  console.log("connected");
})();

app.listen(PORT, () => {
  console.log("Server is up and running");
});
