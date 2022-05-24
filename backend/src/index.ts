import express from "express";
require("express-async-errors");
import path from "path";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
const swaggerDocument = require("./swagger.json");

import * as dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/dbConfig";
import route from "./routes";
import { socket } from "./services/chat.service";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

app.use(
  cors({
    credentials: true,
    origin: true,
    methods: "*",
  })
);

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());

connectDB();

route(app);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const server = require("http").createServer(app);

socket(server);

server.listen(port, () => {
  console.log("The application is listening on port 3001");
});
