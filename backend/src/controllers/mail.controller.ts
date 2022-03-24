import { Response, NextFunction, Request } from "express";
import { PollService } from "../services/poll.service";

export class MailController {
  static async sendMail(req: Request, res: Response) {
    let poll = await PollService.getPollById(req.user);
    res.status(200).json({
      status: "success",
      error: null,
      message: null,
      data: poll,
    });
  }
}
