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
const loginService = require('../services/login.service');
const registerService = require('../services/register.service');
const models_1 = require("../models");
class AuthController {
    // [GET] /login
    showLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let a = yield models_1.db.User.findAll();
            res.status(200).json(a);
        });
    }
    // [GET] /register 
    showRegister(req, res, next) {
        res.status(200).json('Register Page');
    }
    // [POST] / register
    register(req, res, next) {
        registerService.createUser(req.body);
    }
    // [POST] /login
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = loginService.login(req.body.email, req.body.password);
            // res.cookie("refreshToken",  user.refreshToken, {
            //     httpOnly: true,
            //     secure: false, // deploy true
            //     path: "/",
            //     sameSite: "strict" //   csrf
            // })
            res.status(200).json(user);
        });
    }
}
module.exports = new AuthController;
