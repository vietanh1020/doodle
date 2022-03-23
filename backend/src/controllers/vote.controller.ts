import { Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";

import { VoteService } from "../services/vote.service";

export class VoteController {
  static async getPollById(req: Request, res: Response) {
    let pollData = await VoteService.getPoll(req)
    res.status(200).json({
      status: 200,
      error: null,
      message: null,
      data: pollData,
    });

    throw new HttpException(400, "Poll not Found");
  }
}
