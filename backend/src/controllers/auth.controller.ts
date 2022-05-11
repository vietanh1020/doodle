import { NextFunction, Response, Request } from "express";

import { RegisterService } from "../services/register.service";
import { LoginService } from "../services/login.service";
import { ResponseDto } from "../dto/ResponseDto";

export class AuthController {
  // [POST] / register
  static async register(req: Request, res: Response, next: NextFunction) {
    const user = await RegisterService.createUser(req.body);
    res.status(201).json(new ResponseDto({ data: user }));
  }

  // [POST] /login
  static async login(req: Request, res: Response, next: NextFunction) {
    const result: any = await LoginService.login(
      req.body.email,
      req.body.password
    );

    if (result) {
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      return res.status(200).json(new ResponseDto({ data: result }));
    }
  }

  // [POST]  // logout
  static async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("refreshToken");
    res.status(200).json(new ResponseDto({ data: "Logout success" }));
  }
}
