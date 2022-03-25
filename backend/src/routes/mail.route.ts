import express from "express";

import { MailController } from "../controllers/mail.controller";
const router = express.Router();

router.get("/:pollId", MailController.sendtoEmail);

export default router;
