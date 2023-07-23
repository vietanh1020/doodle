import { Request, Response } from "express";

import { HttpException } from "../utils/exceptions/HttpException";
import { VoteService } from "../services/vote.service";
import { ResponseDto } from "../dto/ResponseDto";

export class VoteController {
  static async getPollById(req: Request, res: Response) {
    const poll = await VoteService.getPoll(req.params.pollId);

    if (!poll) {
      throw new HttpException(400, "Poll Not Found");
    }

    return res.status(200).json(new ResponseDto({ data: poll }));
  }

  static async vote(req: Request, res: Response) {
    const id = Number(req.params.pollId);
    console.log(req.body);

    const email = req.body.email;
    const vote = await VoteService.vote(req.body, id, email);

    if (!vote) {
      throw new HttpException(500, "Server can't save Vote");
    }

    return res.status(201).json(new ResponseDto({ data: vote }));
  }
}
