import express from "express";
import { ResultController } from "../controllers/resultPoll.controller";

const router = express.Router();

router.get('/:pollId',ResultController.resultPoll)

export default router;
