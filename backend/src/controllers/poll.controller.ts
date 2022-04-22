import { Response, NextFunction, Request } from "express";
import { PollService } from "../services/poll.service";

export class PollController {
  static async index(req: Request, res: Response) {
    let poll = await PollService.getPollByUserId(req.user);

    res.status(200).json({
      status: 200,
      error: null,
      message: null,
      data: poll,
    });
  }

  static async getOnePoll(req: Request, res: Response) {
    let poll = await PollService.getOnePoll(req);

    res.status(200).json({
      status: 200,
      error: null,
      message: null,
      data: poll,
    });
  }



  static async createPoll(req: Request, res: Response) {
    let pollData = await PollService.createPoll(req);
    res.status(201).json({
      status: 201,
      error: null,
      message: null,
      data: pollData,
    });
  }

  static async updatePoll(req: Request, res: Response, next: NextFunction) {
    let pollData = await PollService.updatePoll(req);
    res.status(200).json({
      status: "Updated",
      error: null,
      message: null,
      data: pollData,
    });
  }

  static async deletePoll(req: Request, res: Response) {
    let pollData = await PollService.deletePoll(req);
    res.status(204).json({
      status: 204,
      error: null,
      message: null,
      data: null,
    });
  }
}
