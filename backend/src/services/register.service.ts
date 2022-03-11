import { NextFunction, Response, Request } from "express";
const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// [GET] /register 
function showRegister(req: Request, res: Response, next: NextFunction) {
    res.status(200).json('Register Page')
}

// [POST] /register
async function register(req: Request, res: Response, next: NextFunction) {

    const user = req.body

    const salt = bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hashSync(req.body.password, salt)

    const newUser = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: hashed,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    db.Users.create(newUser)
        .then(res.status(200).json(newUser))
        .catch((err: Error) => {
            res.status(400).json('DATA ERROR')
        })

}


module.exports = {
    showRegister,
    register,
}