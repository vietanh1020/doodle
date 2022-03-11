const jwt = require('jsonwebtoken')
const db = require('../models')
import { NextFunction, Response, Request } from 'express'
import { where } from 'sequelize/types'

class AuthMiddleware {
    //checkDuplicateEmail
    async checkDuplicateEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await db.Users.findOne({ where: { email: req.body.email } });
            if (user) {
                return res.status(400).json({ message: 'Email đã tồn tại trong hệ thống' })
            }
            next()
        } catch (error) {
            console.log(error)
        }
    }

    // verify token 
    verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.token as string;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken,
                process.env.JWT_ACCESS_KEY, (err: Error) => {
                    if (err) {
                        res.status(401).json({message : "Token không hợp lệ"});
                    }
                    next()
                }
            )
        } else {
            res.status(401).json({message : "Bạn chưa đăng nhập"})
        }
    }
}

module.exports = new AuthMiddleware