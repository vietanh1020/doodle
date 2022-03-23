import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import {HttpException} from "../exceptions/HttpException"
require("express-async-errors");

import { db } from "../models";
const { JWT_ACCESS_KEY = "secret" } = process.env;

export class AuthMiddleware {
  //checkDuplicateEmail
  static async checkDuplicateEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (user) throw Error("email đã tồn tại");
  }

  //verify token
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.token as string;
    if (token) {
      const accessToken = token.split(" ")[1];
      let payload: any = await jwt.verify(accessToken, JWT_ACCESS_KEY);
      req.user = payload.id;
      return next();
    }
    throw new HttpException(400, 'chuwa co token');
  }

  //verify User [/poll/ (update || delete)]
  static async canPollEdit(req: Request, res: Response, next: NextFunction) {
    const poll_id = await db.Poll.findOne({
      where: {
        id: req.params.id,
        userId: req.user,
      },
    });

    if (!poll_id) throw Error("Không được phép");
    next();
  }
}
