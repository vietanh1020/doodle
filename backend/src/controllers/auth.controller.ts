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
      res.cookie("access_token", result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 30 * 24 * 3600 * 1000), // 30 days
      });

      return res.status(200).json(new ResponseDto({ data: result }));
    }
  }

  // [POST]  // logout
  static async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("refreshToken");
    res.clearCookie("access_token");
    res.status(200).json(new ResponseDto({ data: "Logout success" }));
  }
}
