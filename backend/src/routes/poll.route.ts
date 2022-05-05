import express from "express";

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PollController } from "../controllers/poll.controller";
import { PollMiddleWare } from "../middlewares/poll.middleware";
import { validateRequestSchema } from "../middlewares/validate";
import { pollSchema } from "../utils/schema/poll.schema";
const router = express.Router();

// GET POLL BY USER ID
router.get("/", AuthMiddleware.verifyToken, PollController.index);

// CREATE POLL
router.post(
  "/",
  AuthMiddleware.verifyToken,
  pollSchema,
  validateRequestSchema,
  PollMiddleWare.checkTime,
  PollController.createPoll
);

// GET POLL[id]
router.get("/:id", PollController.getOnePoll);

// UPDATE POLL
router.put(
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

// RESULT POLL

export default router;
