import { Job } from "bull";
import nodemailer from "nodemailer";

import { HttpException } from "../../utils/exceptions/HttpException";
import { MailService } from "../mail.service";
import { ResultService } from "../resultPoll.service";

const emailProcess = async (job: Job) => {
  const {
    MAIL_USER = "vak63.uet.vnu@gmail.com",
    MAIL_PASS = "Vietanh0510@",
    MAIL_SERVICE = "mailhog",
  } = process.env;

  let transporter = nodemailer.createTransport({
    host: MAIL_SERVICE,
    port: 1025,
    secure: false,
    requireTLS: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
    logger: false,
  });

  const mail: any = await MailService.getEmailByPollId(job.data.pollId);

  const resultVote = await ResultService.resultPoll(job.data.pollId);

  if (!resultVote) {
    throw new HttpException(500, "Server không thể lấy kết quả bình chọn");
  }

  let html = "";
  for (let key in resultVote) {
    html = html + `${key} : ${resultVote[key]}  <br> `
  }

  const mailOptions = {
    from: MAIL_USER,
    to: mail.dataValues.email,
    subject: "Kết Quả bình chọn Doodle",
    html: html,
  };

  await transporter.sendMail(mailOptions);
};

export default emailProcess;
