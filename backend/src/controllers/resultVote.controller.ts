import { Request, Response } from "express";
import { json } from "stream/consumers";
import { HttpException } from "../exceptions/HttpException";
import { ResultService } from "../services/resultPoll.service";

export class ResultController {
  static async resultPoll(req: Request, res: Response) {
    const pollAnswers: any = await ResultService.getAnswersByPollId(req);
    const voteAnswers: any = await ResultService.getAnswerByVote(req);
  
    if (!pollAnswers) {
      throw new HttpException(500, "Error get data Poll");
    }

    if (!voteAnswers) {
      throw new HttpException(500, "Error get data Vote");
    }

    const result = ResultService.resultPoll(pollAnswers,voteAnswers)

    res.status(200).json({
      status: 200,
      errors: null,
      message: null,
      data: result
    });
    
  }
}
