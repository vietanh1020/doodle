import express from "express";

import { MailController } from "../controllers/mail.controller";
const router = express.Router();

router.post("/:pollId", MailController.sendtoEmail);

export default router;
