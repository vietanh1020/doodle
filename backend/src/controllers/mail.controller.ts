import { Response, NextFunction, Request } from "express";
import { sendNewEmail } from "../services/queue/email.queue";

export class MailController {
  static async sendtoEmail(req: Request, res: Response) {
    // await sendNewEmail({ pollId: req.params.pollId });
    // res.send({ status: req.params.pollId });
    const result = await sendNewEmail({ pollId: req.params.pollId });
    res.status(200).json({
      status: 200,
      error: null,
      message: null,
      data: result,
    });
  }
}
