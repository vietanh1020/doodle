import express, { Request, Response } from "express";
require("express-async-errors");

import "dotenv/config";
import connectDB from "./config/dbConfig";
import route from "./routes";
import { sendNewEmail } from "./services/queue/email.queue";

const app = express();
const port = 3001;
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

connectDB();

app.post("/send-email/:pollId", async (req: Request, res: Response) => {
  const result =  await sendNewEmail({ pollId: req.params.pollId });
  res.status(200).json({
    status: 200,
    error: null,
    message: null,
    data : result
  })
});

route(app);

app.listen(port, () => {
  console.log("The application is listening on port 3001");
});
