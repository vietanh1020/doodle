import { NextFunction, Response, Request } from "express";
const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function generateAccessToken(user: { id: number }) {
    return jwt.sign(
        { id: user.id, },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "30s" }
    )
}

// generateReFreshToken 
function generateRefreshToken(user: { id: number }) {
    return jwt.sign(
        { id: user.id, },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "365d" }
    )
}

// [GET] /login
function showLogin(req: Request, res: Response, next: NextFunction) {
    res.status(200).json('Login Page')
}

// [POST] /login
async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await db.Users.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).json('Email không tồn tại !')
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json('Sai mật khẩu')
        }

        if (user && validPassword) {
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false, // deploy true
                path: "/",
                sameSite: "strict" //   csrf
            })


            res.status(200).json({ user, accessToken })

        }

    } catch (error) {
        return res.status(500).json(error)
    }
}

function requestRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken
    
    if (!refreshToken) {
        res.status(401).json("Chưa đăng nhập")
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error: Error, user: any) => {
        if (error) {
            console.log(error)
        }

        // create a new token
        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

        res.cookie("refreshToken",
            newRefreshToken,
            {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            }
        )
        res.status(200).json({ accesToken: newAccessToken })
    })
}


module.exports = {
    showLogin,
    login,
    requestRefreshToken
}
