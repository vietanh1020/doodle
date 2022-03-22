import express from "express";

import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import errorHandler from "../middlewares/errorHandler"

const router = express.Router();

// router.get("/login", AuthController.showLogin);
router.post("/login", AuthController.login);
router.post("/logout", AuthMiddleware.verifyToken, AuthController.logout);
// router.get("/register", AuthController.showRegister);
router.post(
  "/register",
  AuthMiddleware.checkDuplicateEmail,
  AuthController.register
);
// router.post('/refresh-token',authController.requestRefreshToken)

export default router;
