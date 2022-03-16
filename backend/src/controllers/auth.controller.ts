const loginService = require('../services/login.service')
const  registerService = require('../services/register.service');
import { NextFunction, Response, Request } from "express";
import { DataTypes } from "sequelize/types";

import {db} from '../models';

class AuthController {
    // [GET] /login
    async showLogin(req: Request, res: Response, next: NextFunction) {
        let a = await db.User.findAll();
           res.status(200).json( a);
    }

    // [GET] /register 
    showRegister(req: Request, res: Response, next: NextFunction) {
        res.status(200).json('Register Page')
    }

    // [POST] / register
    register(req: Request, res: Response, next: NextFunction){
        registerService.createUser(req.body)
    }


    // [POST] /login
    async login(req: Request, res: Response, next: NextFunction) {
        const  user = loginService.login(req.body.email, req.body.password)
            // res.cookie("refreshToken",  user.refreshToken, {
            //     httpOnly: true,
            //     secure: false, // deploy true
            //     path: "/",
            //     sameSite: "strict" //   csrf
            // })

        res.status(200).json(user)
    }

}
module.exports = new AuthController

