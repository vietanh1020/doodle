import { Request } from "express";
import nodemailer from "nodemailer";
import { HttpException } from "../exceptions/HttpException";
import { db } from "../models";
import { ResultService } from "./resultPoll.service";

export class MailService {
  static async getEmailByPollId(req: Request) {
    let email = await db.User.findOne({
      attributes: ["email"],
      include: [
        {
          attributes: [],
          model: db.Poll,
          where: { id: req.params.pollId },
        },
      ],
    });

    if (!email) {
      throw new HttpException(500, "Không tìm thấy địa chỉ mail người nhận !");
    }

    return email;
  }

  static async sendEmail(req: Request) {
    const {
      MAIL_USER = "vak63.uet.vnu@gmail.com",
      MAIL_PASS = "Vietanh0510@",
      MAIL_SERVICE = "gmail",
    } = process.env;

    let transporter = nodemailer.createTransport({
      service: MAIL_SERVICE,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
      logger: true,
    });

    const mail: any = await MailService.getEmailByPollId(req);
    const resultVote = await ResultService.resultPoll(req);

    const mailOptions = {
      from: MAIL_USER,
      to: mail.dataValues.email,
      subject: "Kết Quả bình chọn Doodle",
      html: ``,
    };

    return await transporter.sendMail(mailOptions);
  }
}
