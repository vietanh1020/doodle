import express, { Request, Response } from "express";
require("express-async-errors");
import path from "path";
var cors = require('cors')

import "dotenv/config";
import connectDB from "./config/dbConfig";
import route from "./routes";
import { socket } from "./services/chat.service";

const app = express();
const port = 3001;
const server = require("http").createServer(app);

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

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

connectDB();

//Chỉ ra đường dẫn chứa css, js, images...
app.use(express.static(path.join(__dirname, "public")));

// Tạo router
app.get("/chat/:pollId", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

route(app);

socket(app);

server.listen(port, () => {
  console.log("The application is listening on port 3001");
});
