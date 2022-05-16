import { Request, Response } from "express";
import { HttpException } from "../utils/exceptions/HttpException";
import { ResultService } from "../services/resultPoll.service";
import { ResponseDto } from "../dto/ResponseDto";

export class ResultController {
  static async resultPoll(req: Request, res: Response) {
    const result = await ResultService.resultPoll(req.params.pollId);
    if (!result) {
      throw new HttpException(404, "Poll Not Found");
    }

    res.status(200).json(new ResponseDto({ data: result }));
  }
}
