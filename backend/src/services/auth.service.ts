import { NextFunction, Response, Request } from "express";

class authService{
    // [GET] /login
    showLogin(req: Request, res: Response, next: NextFunction){
        res.status(200).json('Login Page')
    }

    // [POST] /login
    login(req: Request, res: Response, next: NextFunction){

    }

    // [GET] /register 
    showRegister(req: Request, res: Response, next: NextFunction){
        res.status(200).json('Register Page')
    }

    // [POST] /register
    register(req: Request, res: Response, next: NextFunction){
        const {email, firstName, lastName, password}  = req.body       
        res.status(200).json({email: email, firstName: firstName, lastName: lastName, password: password})
    }
}

module.exports = new authService()