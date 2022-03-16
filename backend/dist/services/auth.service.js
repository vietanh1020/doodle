"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
function generateAccessToken(user) {
    return jwt.sign({ id: user.id, }, process.env.JWT_ACCESS_KEY, { expiresIn: "30s" });
}
// generateReFreshToken 
function generateReFreshToken(user) {
    return jwt.sign({ id: user._id, }, process.env.JWT_REFRESH_KEY, { expiresIn: "30d" });
}
// [GET] /login
function showLogin(req, res, next) {
    res.status(200).json('Login Page');
}
// [POST] /login
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db.Users.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(401).json('Email không tồn tại !');
            }
            const validPassword = yield bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).json('Sai mật khẩu');
            }
            if (user && validPassword) {
                const accessToken = generateAccessToken(user);
            }
        }
        catch (error) {
            return res.status(500).json(error);
        }
    });
}
// [GET] /register 
function showRegister(req, res, next) {
    res.status(200).json('Register Page');
}
// [POST] /register
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashed = yield bcrypt.hashSync(req.body.password, salt);
        const newUser = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: hashed,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        db.Users.create(newUser)
            .then(res.status(200).json(newUser))
            .catch((err) => {
            res.status(400).json('DATA ERROR');
        });
    });
}
module.exports = {
    showLogin,
    login,
    showRegister,
    register
};
