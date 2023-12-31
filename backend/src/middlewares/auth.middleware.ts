import { NextFunction, Response, Request } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import { HttpException } from "../utils/exceptions/HttpException";
import { db } from "../models";
const { JWT_ACCESS_KEY = "secret" } = process.env;

export class AuthMiddleware {
  static async checkDuplicateEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (user) {
      throw new HttpException(401, "Email đã được đăng kí");
    }
    next();
  }

  static async verifyGGToken(req: Request, res: Response, next: NextFunction) {
    const { clientId, credential }: { clientId: string; credential: string } =
      req.body;
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    req.body.user = payload;
    return next();
  }

  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token;
    console.log(token);

    if (token) {
      jwt.verify(token, JWT_ACCESS_KEY, (err, payload: any) => {
        if (err) {
          throw new HttpException(401, "Token không hợp lệ");
        }
        req.user = payload.id;
        return next();
      });
    } else {
      throw new HttpException(401, "Bạn chưa đăng nhập");
    }
  }

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
