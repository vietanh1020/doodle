"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class authService {
    // [GET] /login
    showLogin(req, res, next) {
        res.status(200).json('Login Page');
    }
    // [POST] /login
    login(req, res, next) {
    }
    // [GET] /register 
    showRegister(req, res, next) {
        res.status(200).json('Register Page');
    }
    // [POST] /register
    register(req, res, next) {
        const { email, firstName, lastName, password } = req.body;
        res.status(200).json({ email: email, firstName: firstName, lastName: lastName, password: password });
    }
}
module.exports = new authService();
