import { Request, Response } from "express";
import { HttpException } from "../utils/exceptions/HttpException";
import { ResultService } from "../services/resultPoll.service";

export class ResultController {
  static async resultPoll(req: Request, res: Response) {
    const result = await ResultService.resultPoll(req.params.pollId);
    if (!result) {
      throw new HttpException(500, "Server không thể lấy kết quả bình chọn");
    }

    res.status(200).json({
      status: 200,
      errors: null,
      message: null,
      data: result,
    });
  }
}
