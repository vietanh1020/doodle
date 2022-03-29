import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
require("express-async-errors");
import jwt from "jsonwebtoken";

import { HttpException } from "../utils/exceptions/HttpException";
import { db } from "../models";
const { JWT_ACCESS_KEY = "secret" } = process.env;

export class AuthMiddleware {
  static async checkData(req: Request, res: Response, next: NextFunction) {
    //check Duplicate Email
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (user) {
      throw new HttpException(400, "email đã được đăng kí");
    }

    next();
  }
  static async validateRequestSchema(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

  //verify token
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.token as string;
    if (token) {
      const accessToken = token.split(" ")[1];
      let payload: any = await jwt.verify(accessToken, JWT_ACCESS_KEY);
      req.user = payload.id;
      return next();
    } else throw new HttpException(400, "Bạn chưa đăng nhập");
  }

  //verify User [/poll/ (update || delete)]
  static async canPollEdit(req: Request, res: Response, next: NextFunction) {
    const poll_id = await db.Poll.findOne({
      where: {
        id: req.params.id,
        userId: req.user,
      },
    });

    if (!poll_id) throw new HttpException(403, "Không được phép");
    next();
  }
}
