import express from "express";

import { MailController } from "../controllers/mail.controller";
const router = express.Router();

// GET POLL BY USER ID
router.get("/:pollId", MailController.sendMail);

export default router;
