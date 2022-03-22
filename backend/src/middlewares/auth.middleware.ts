import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
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
      next();
    } else {
      res.status(401).json({ message: "Bạn chưa đăng nhập" });
    }
  }

  //verify User [/poll/ (update || delete)]
  static async canPollEdit(req: Request, res: Response, next: NextFunction) {
    const poll_id = await db.Poll.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (poll_id) {
      next();
    }
  }
}
