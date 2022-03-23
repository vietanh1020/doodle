import express from "express";

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PollController } from "../controllers/poll.controller";
const router = express.Router();

// GET POLL BY USER ID
router.get("/", AuthMiddleware.verifyToken, PollController.index);

// CREATE POLL
router.post(
  "/",
  AuthMiddleware.verifyToken,
  PollController.createPoll
);

// UPDATE POLL
router.patch(
  "/:id",
  AuthMiddleware.verifyToken,
  AuthMiddleware.canPollEdit,
  PollController.updatePoll
);

// DELETE POLL
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  AuthMiddleware.canPollEdit,
  PollController.deletePoll
);

export default router;
