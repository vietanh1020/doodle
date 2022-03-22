import jwt from "jsonwebtoken";
import { db } from "../models";
import { NextFunction, Response, Request } from "express";
import { Sequelize } from "sequelize-typescript";
import console from "console";
const { JWT_ACCESS_KEY = "secret" } = process.env;

export class AuthMiddleware {
  //checkDuplicateEmail
  static async checkDuplicateEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      if (user) {
        return res
          .status(400)
          .json({ message: "Email đã tồn tại trong hệ thống" });
      }
      next();
    } catch (error) {
      console.log(error);
    }
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
