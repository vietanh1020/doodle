import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import { HttpException } from "../utils/exceptions/HttpException";
import { db } from "../models";
import { TokenPayload } from "google-auth-library";
import { UserModel } from "../models/users";

const { JWT_ACCESS_KEY = "secret" } = process.env;
const { JWT_REFRESH_KEY = "secret" } = process.env;
const { JWT_ACCESS_EXPIRE_IN = "30d" } = process.env;
const { JWT_REFRESH_EXPIRE_IN = "365d" } = process.env;

export class LoginService {
  static async generateAccessToken(id: any) {
    return jwt.sign({ id: id }, JWT_ACCESS_KEY, {
      expiresIn: JWT_ACCESS_EXPIRE_IN,
    });
  }

  static async generateRefreshToken(id: any) {
    return jwt.sign(
      {
        id: id,
      },
      JWT_REFRESH_KEY,
      { expiresIn: JWT_REFRESH_EXPIRE_IN }
    );
  }

  static async login(userDto: Required<TokenPayload>) {
    let user: UserModel | null;
    user = await db.User.findOne({ where: { email: userDto.email } });

    if (!user) {
      user = await db.User.create({
        password: userDto.aud,
        email: userDto.email,
        lastName: userDto.given_name,
        firstName: userDto.family_name,
      } as UserModel);
    }

    const accessToken = await LoginService.generateAccessToken(user.id);
    const refreshToken = await LoginService.generateRefreshToken(user.id);
    const userInfor = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avata: userDto.picture,
    };
    return { refreshToken, accessToken, user: userInfor };
  }

  static async requestRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new HttpException(403, "Chưa đăng nhập");
    }

    const isRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_KEY);
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
