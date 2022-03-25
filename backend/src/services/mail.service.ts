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
      MAIL_SERVICE = "mailhog",
    } = process.env;

    let transporter = nodemailer.createTransport({
      host: "mailhog",
      port: 1025,
      secure: false,
      requireTLS: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
      logger: true,
    });

    const mail: any = await MailService.getEmailByPollId(req);

    const html = "Kết quả";

    const resultVote = await ResultService.resultPoll(req);

    if (!resultVote) {
      throw new HttpException(500, "Server không thể lấy kết quả bình chọn");
    }

    const mailOptions = {
      from: MAIL_USER,
      to: mail.dataValues.email,
      subject: "Kết Quả bình chọn Doodle",
      html: html,
    };

    return await transporter.sendMail(mailOptions);
  }

  static async autoSendMail(){
      
  }

}
