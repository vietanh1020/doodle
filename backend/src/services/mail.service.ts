import { HttpException } from "../utils/exceptions/HttpException";
import { db } from "../models";
import { Request } from "express";
import nodemailer from "nodemailer";
import { ResultService } from "./resultPoll.service";

export class MailService {
  static async getEmailByPollId(_pollId: number) {
    let email = await db.User.findOne({
      attributes: ["email"],
      include: [
        {
          attributes: [],
          model: db.Poll,
          where: { id: _pollId },
        },
      ],
    });

    if (!email) {
      throw new HttpException(500, "Không tìm thấy địa chỉ mail người nhận !");
    }

    return email;
  }
}
