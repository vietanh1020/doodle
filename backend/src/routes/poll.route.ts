import express from "express";

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PollController } from "../controllers/poll.controller";

const router = express.Router();

router.post(
  "/create-poll",
  AuthMiddleware.verifyToken,
  PollController.createPoll
); //,authMiddleware.verifyToken // ok
router.post(
  "/update-poll/:id",
  AuthMiddleware.verifyToken,
  AuthMiddleware.canPollEdit,
  PollController.updatePoll
);
router.post(
  "/delete-poll/:id",
  AuthMiddleware.verifyToken,
  PollController.deletePoll
);
router.get("/", AuthMiddleware.verifyToken, PollController.test);

export default router;
