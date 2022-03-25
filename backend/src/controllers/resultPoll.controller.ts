import { Request, Response } from "express";
import { ResultService } from "../services/resultPoll.service";

export class ResultController {
  static async resultPoll(req: Request, res: Response) {
    const result = await ResultService.resultPoll(req);

    res.status(200).json({
      status: 200,
      errors: null,
      message: null,
      data: result,
    });
  }
}
