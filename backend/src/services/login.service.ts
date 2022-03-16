import { NextFunction, Response, Request } from "express";
const db = require('../models')
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as dotenv from "dotenv";
dotenv.config()

const { JWT_ACCESS_KEY = 'secret' } = process.env
const { JWT_REFRESH_KEY = 'secret' } = process.env
const { JWT_ACCESS_EXPIRE_IN = '30s' } = process.env
const { JWT_REFRESH_EXPIRE_IN = '365d' } = process.env

class LoginService {
    generateAccessToken(id: any) {
        return jwt.sign(
            id,
            JWT_REFRESH_KEY,
            { expiresIn: JWT_ACCESS_EXPIRE_IN }
        )
    }
    // generateReFreshToken 
    generateRefreshToken(id: any) {
        return jwt.sign(
            id,
            JWT_ACCESS_KEY,
            { expiresIn: JWT_REFRESH_EXPIRE_IN }
        )
    }

    async login(email: string, password: string) {
        try {
            const user = await db.Users.findOne({ where: { email: email } });
            return user
            // if (!user) {
            //     return {  message: "Email không tồn tại trong hệ thống" }
            // }
            // const validPassword = await bcrypt.compare(password, user.password);
            // if (!validPassword) {
            //     return { message: "Mật khẩu không đúng" }
            // }

            // if (user && validPassword) {
            //     const accessToken = this.generateAccessToken(user.id)
            //     const refreshToken = this.generateRefreshToken(user.id)
            //     //return {user, accessToken, refreshToken }
            //     return ({message : "Success"})
            // }
        } catch (error) {
            return {status: 500}
        }
    }


    // requestRefreshToken
    // requestRefreshToken(req: Request, res: Response) {
    //     const refreshToken = req.cookies.refreshToken

    //     if (!refreshToken) {
    //         res.status(401).json("Chưa đăng nhập")
    //     }

    //     jwt.verify(refreshToken, JWT_REFRESH_KEY , (error: Error) => {
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
}




module.exports = new LoginService
