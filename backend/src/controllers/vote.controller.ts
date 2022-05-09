import { Request, Response } from "express";

import { HttpException } from "../utils/exceptions/HttpException";
import { VoteService } from "../services/vote.service";
import { ResponseDto } from "../dto/ResponseDto";

export class VoteController {
  static async getPollById(req: Request, res: Response) {
    const poll = await VoteService.getPoll(req);

    if (!poll) {
      throw new HttpException(400, "Poll Not Found");
    }
    
    return res.status(200).json(new ResponseDto({ data: poll }));
  }

  static async vote(req: Request, res: Response) {
    const vote = await VoteService.vote(req);

    if (!vote) {
      throw new HttpException(500, "Không thể lưu kết quả vote");
    }

    return res.status(201).json(new ResponseDto({ data: vote }));
  }
}
