import { Request, Response } from "express";

import { HttpException } from "../utils/exceptions/HttpException";
import { VoteService } from "../services/vote.service";

export class VoteController {
  static async getPollById(req: Request, res: Response) {
    let pollData = await VoteService.getPoll(req);

    if (!pollData) {
      throw new HttpException(400, "Poll Not Found");
    }

    return res.status(200).json({
      status: 200,
      error: null,
      message: null,
      data: pollData,
    });
    
  }

  static async vote(req: Request, res: Response) {
    const data = await VoteService.vote(req);

    if (!data) {
      throw new HttpException(500, "Không thể lưu kết quả vote");
    }

    return res.status(201).json({
      status: 201,
      error: null,
      message: null,
      data: data,
    });
  }
}
