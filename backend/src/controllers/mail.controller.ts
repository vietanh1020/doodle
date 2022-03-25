import { Response, NextFunction, Request } from "express";
import { MailService } from "../services/mail.service";

export class MailController {
  static async sendtoEmail(req: Request, res: Response) {
    let email = await MailService.sendEmail(req) ;
    res.status(200).json(email)
  }
}
