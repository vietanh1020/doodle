import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/exceptions/HttpException";

export class PollMiddleWare {
  static checkTime(req: Request, res: Response, next: NextFunction) {
    const currentTime: Date = new Date();
    const timeStart: Date = new Date(req.body.startAt);
    const timeEnd: Date = new Date(req.body.endAt);

    if (timeStart < currentTime) {
      throw new HttpException(
        400,
        "Thời gian bắt đầu phải sau thời gian hiện tại"
      );
    }

    if (timeEnd < timeStart) {
      throw new HttpException(
        400,
        "Thời gian kết thúc phải sau thời gian bắt đầu"
      );
    }

    next();
  }
}
