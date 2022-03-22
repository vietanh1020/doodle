import express from "express";
import "dotenv/config";
import connectDB from "./config/dbConfig";
import route from "./routes";
require('express-async-errors');

const app = express();
const port = 3001;
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

connectDB();

route(app);

app.listen(port, () => {
  console.log("The application is listening on port 3001");
});
