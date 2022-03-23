import { RegisterService } from "../services/register.service";
import { LoginService } from "../services/login.service";
import { NextFunction, Response, Request } from "express";
import {HttpException} from "../exceptions/HttpException"
require("express-async-errors");

export class AuthController {
  // [GET] /login
  static async showLogin(req: Request, res: Response, next: NextFunction) {
  }

  // [GET] /register
  static async showRegister(req: Request, res: Response, next: NextFunction) {
  }

  // [POST] / register
  static async register(req: Request, res: Response, next: NextFunction) {
    const user = await RegisterService.createUser(req.body);
    res.status(201).json({
      status: "201",
      error: null,
      message: null,
      data: user,
    });
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

    res.status(200).json({
      status: 200,
      error: null,
      message: result.message,
      data: result,
    });
  }

  // [POST]  // logout
  static async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("refreshToken");
    res.status(200).json({
      status: 20,
      error: null,
      message: null,
      data: null,
    });
  }
}
