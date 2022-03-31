import express, { Request, Response } from "express";
require("express-async-errors");

import "dotenv/config";
import connectDB from "./config/dbConfig";
import route from "./routes";

const app = express();
const port = 3001;
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());


app.get("/vietanh", (req: Request, res: Response)=>{
  res.status(200).json({status : "OK"});
})


connectDB();

route(app);

app.listen(port, () => {
  console.log("The application is listening on port 3001");
});
