import express from "express";

import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { validateRequestSchema } from "../middlewares/validate";
import { registerSchema } from "../utils/schema/register.shema";

const router = express.Router();

router.post("/login", AuthController.login);

router.post("/logout", AuthMiddleware.verifyToken, AuthController.logout);

router.post(
  "/register",
  registerSchema,
  validateRequestSchema,
  AuthMiddleware.checkDuplicateEmail,
  AuthController.register
);
// router.post('/refresh-token',AuthController.requestRefreshToken)

export default router;
