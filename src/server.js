import express from "express";
const app = express();
const PORT = 8000;
import { createClient } from "redis";
import Redis from "ioredis";
import { connectDB } from "./config/db";
import { router } from "./router/router";
const swaggerUi = require("swagger-ui-express");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/", router);

const outputFile = require("../src/swagger/swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(outputFile));

// export const redis = new Redis();

// redis.config("SET", "maxmemory", 10);

// redis.config("SET", "maxmemory-policy", "allkeys-lru");

// export let client;

// (async () => {
//   client = createClient();

//   client.on("error", (err) => {
//     console.log(err);
//   });

//   await client.connect();

//   const info = await client.info();
//   // console.log(info);

//   console.log("connected");
// })();

app.listen(PORT, () => {
  console.log("Server is up and running");
});
