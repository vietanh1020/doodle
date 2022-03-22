import { RegisterService } from "../services/register.service";
import { LoginService } from "../services/login.service";
import { NextFunction, Response, Request } from "express";
import { db } from "../models";

import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthController {
  // [GET] /login
  static async showLogin(req: Request, res: Response, next: NextFunction) {
    let a = await db.User.findAll();
    res.status(200).json(a);
  }

  // [GET] /register
  static async showRegister(req: Request, res: Response, next: NextFunction) {
    res.status(200).json("Register Page");
  }

  // [POST] / register
  static async register(req: Request, res: Response, next: NextFunction) {
    const user = await RegisterService.createUser(req.body);
    res.status(200).json(user);
  }

  // [POST] /login
  static async login(req: Request, res: Response, next: NextFunction) {
    const result: any = await LoginService.login(
      req.body.email,
      req.body.password
    );

    if (result.user) {
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      return res.status(200).json(result);
    }

    return res.status(result.statusCode).json(result);
  }

  // [POST]  // logout
  static async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("refreshToken");
    res.status(200).json("Đã đăng xuất");
  }
}
