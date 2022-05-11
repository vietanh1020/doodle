import { Response, NextFunction, Request } from "express";
import { ResponseDto } from "../dto/ResponseDto";
import { sendNewEmail } from "../services/queue/email.queue";

export class MailController {
  static async sendtoEmail(req: Request, res: Response) {
    const result = await sendNewEmail({ pollId: req.params.pollId });
    res.status(200).json(new ResponseDto({ data: result }));
  }
}
