import express from "express";
require("express-async-errors");
import path from "path";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/dbConfig";
import route from "./routes";
import { socket } from "./services/chat.service";

const app = express();
const port = 3001;

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());

connectDB();

route(app);

const server = require("http").createServer(app);
socket(server);

server.listen(port, () => {
  console.log("The application is listening on port 3001");
});
