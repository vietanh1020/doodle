import express from "express";
import { VoteController } from "../controllers/vote.controller";

const router = express.Router();

router.get("/:id", VoteController.getPollById);

export default router;
