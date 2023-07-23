import { Request, Response } from "express";
import { TokenPayload } from "google-auth-library";
import { ResponseDto } from "../dto/ResponseDto";
import { LoginService } from "../services/login.service";
import { RegisterService } from "../services/register.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    const user = await RegisterService.createUser(req.body);
    res.status(201).json(new ResponseDto({ data: user }));
  }

  static async login(req: Request, res: Response) {
    const user: Required<TokenPayload> = req.body.user;
    const result: any = await LoginService.login(user);

    if (result) {
      res.cookie("access_token", result.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        expires: new Date(Date.now() + 30 * 24 * 3600 * 1000), // 30 days
      });
      return res.status(200).json(new ResponseDto({ data: result }));
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken");
    res.clearCookie("access_token");
    res.status(200).json(new ResponseDto({ data: "Logout success" }));
  }

  static async check(req: Request, res: Response) {
    res.status(200).json("Hello word");
  }
}
