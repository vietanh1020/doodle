import express from 'express';
import { NextFunction, Response, Request } from "express";
const route = require('./routes')
const app = express();
const port = 3001
const db = require('./config/dbConfig');


app.use(express.urlencoded({
    extended: true
  }))

app.use(express.json())

app.get('/',(req : Request, res : Response)=>{
  res.status(200).json("LÊN")
})

app.listen(port, () => {
    console.log('The application is listening on port ' + port);
})

route(app);