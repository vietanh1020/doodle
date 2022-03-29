import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/exceptions/HttpException";

export class PollMiddleWare {
  static checkTime(req: Request, res: Response, next: NextFunction) {
    const currentTime = new Date();
    const timeStart: Date = req.body.startAt;
    const timeEnd: Date = req.body.endAt;
    if (timeStart.getTime() < currentTime.getTime()) {
      throw new HttpException(
        400,
        "Thời gian bắt đầu phải sau thời gian hiện tại"
      );
    }

    if (timeEnd.getTime() < timeStart.getTime()) {
      throw new HttpException(
        400,
        "Thời gian kết thúc phải sau thời gian bắt đầu"
      );
    }
    next();
  }
}
