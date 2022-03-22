import { Response, NextFunction, Request } from "express";
// import { IUserRequest } from "../middlewares/auth.middleware";
import { PollService } from "../services/poll.service";

export class PollController {
  static test(req: Request, res: Response, next: NextFunction) {
    console.log(req.user);
    res.status(200).json(req.user);
  }

  static async createPoll(req: Request, res: Response) {
    let pollData = await PollService.createPoll(req);
    res.status(201).json({
      status: "success",
      error: null,
      message: null,
      data: pollData,
    });
  }

  static async updatePoll(req: Request, res: Response, next: NextFunction) {
    let pollData = await PollService.updatePoll(req);
    res.status(200).json(pollData);
  }

  static async deletePoll(req: Request, res: Response) {
    let pollData = await PollService.deletePoll(req);
    res.status(204).json(pollData);
  }
}
