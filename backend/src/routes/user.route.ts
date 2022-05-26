import express from "express";
import { getInfor } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", AuthMiddleware.verifyToken, getInfor);

export default router;
