import express from 'express';
import { NextFunction, Response, Request } from "express";
const connectDB = require('./config/dbConfig')
const app = express();
const port = 3001
const route = require('./routes')
app.use(express.urlencoded({
    extended: true
  }))

app.use(express.json())

connectDB()

app.listen(port, () => {
    console.log('The application is listening on port 3001');
})

route(app);