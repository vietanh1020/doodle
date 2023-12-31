import express from "express";
import { VoteController } from "../controllers/vote.controller";

const router = express.Router();

router.post("/:pollId", VoteController.vote);
router.get("/:pollId", VoteController.getPollById);

export default router;
