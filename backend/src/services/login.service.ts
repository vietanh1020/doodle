import { NextFunction, Response, Request } from "express";
import { db } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { HttpException } from "../exceptions/HttpException";
dotenv.config();

const { JWT_ACCESS_KEY = "secret" } = process.env;
const { JWT_REFRESH_KEY = "secret" } = process.env;
const { JWT_ACCESS_EXPIRE_IN = "30d " } = process.env;
const { JWT_REFRESH_EXPIRE_IN = "365d" } = process.env;

export class LoginService {
  static generateAccessToken(id: any) {
    return jwt.sign({ id: id }, JWT_ACCESS_KEY, {
      expiresIn: JWT_ACCESS_EXPIRE_IN,
    });
  }
  // generateReFreshToken

  static generateRefreshToken(id: any) {
    return jwt.sign(
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
      throw new HttpException(401, "Email hoặc mật khẩu không đúng")
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new HttpException(401, "Email hoặc mật khẩu không đúng")
    }

    if (user && validPassword) {
      const accessToken = this.generateAccessToken(user.id);
      const refreshToken = this.generateRefreshToken(user.id);
      return { refreshToken, accessToken };
    }
  }
}

//requestRefreshToken
// requestRefreshToken(req: Request, res: Response) {
//     const refreshToken = req.cookies.refreshToken

//     if (!refreshToken) {
//         res.status(401).json("Chưa đăng nhập")
//     }

//     jwt.verify(refreshToken, JWT_REFRESH_KEY, (error: Error,) => {
//         if (error) {
//             console.log(error)
//         }

//         // create a new token
//         const newAccessToken = this.generateAccessToken(user)
//         const newRefreshToken = this.generateRefreshToken(user)

//         res.cookie("refreshToken",
//             newRefreshToken,
//             {
//                 httpOnly: true,
//                 secure: false,
//                 path: "/",
//                 sameSite: "strict"
//             }
//         )
//         res.status(200).json({ accesToken: newAccessToken })
//     })
// }
