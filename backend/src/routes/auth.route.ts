import express from "express";

import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { validateRequestSchema } from "../middlewares/validate";
import { registerSchema } from "../utils/schema/register.shema";

const router = express.Router();

// router.get("/login", AuthController.showLogin);
router.post("/login", AuthController.login);
router.post("/logout", AuthMiddleware.verifyToken, AuthController.logout);
// router.get("/register", AuthController.showRegister);
router.post(
  "/register",
  registerSchema,
  validateRequestSchema,
  AuthMiddleware.checkData,
  AuthController.register
);
// router.post('/refresh-token',AuthController.requestRefreshToken)

export default router;
