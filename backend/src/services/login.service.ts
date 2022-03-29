import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as dotenv from "dotenv";
dotenv.config();

import { HttpException } from "../utils/exceptions/HttpException";
import { db } from "../models";

const { JWT_ACCESS_KEY = "secret" } = process.env;
const { JWT_REFRESH_KEY = "secret" } = process.env;
const { JWT_ACCESS_EXPIRE_IN = "30d " } = process.env;
const { JWT_REFRESH_EXPIRE_IN = "365d" } = process.env;

export class LoginService {
  static async generateAccessToken(id: any) {
    return await jwt.sign({ id: id }, JWT_ACCESS_KEY, {
      expiresIn: JWT_ACCESS_EXPIRE_IN,
    });
  }

  static async generateRefreshToken(id: any) {
    return await jwt.sign(
      {
        id: id,
      },
      JWT_REFRESH_KEY,
      { expiresIn: JWT_REFRESH_EXPIRE_IN }
    );
  }

  static async login(email: string, password: string) {
    const user = await db.User.findOne({ where: { email: email } });

    if (!user) {
      throw new HttpException(401, "Email hoặc mật khẩu không đúng");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new HttpException(401, "Email hoặc mật khẩu không đúng");
    }

    if (user && validPassword) {
      const accessToken = await LoginService.generateAccessToken(user.id);
      const refreshToken = await  LoginService.generateRefreshToken(user.id);
      return { refreshToken, accessToken };
    }
  }

  static async requestRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new HttpException(403, "Chưa đăng nhập");
    }

    const isRefreshToken = await jwt.verify(refreshToken, JWT_REFRESH_KEY);
    if (!isRefreshToken) {
      throw new HttpException(403, "Token hết hạn đăng nhập lại");
    }

    // CREATE NEW TOKEN
    const newAccessToken = await LoginService.generateAccessToken(req.user);
    const newRefreshToken = await LoginService.generateRefreshToken(req.user);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    res.status(200).json({ accesToken: newAccessToken });
  }
}
