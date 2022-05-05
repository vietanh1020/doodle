import { Response, NextFunction, Request } from "express";
import { PollDto } from "../dto/PollDto";
import { ResponseDto } from "../dto/ResponseDto";
import { PollService } from "../services/poll.service";
import { HttpException } from "../utils/exceptions/HttpException";

export class PollController {
  static async index(req: Request, res: Response) {
    let polls = await PollService.getPollByUserId(req.user);

    res.status(200).json(new ResponseDto({ data: polls }));
  }

  static async getOnePoll(req: Request, res: Response) {
    const { id } = req.params;
    let poll = await PollService.getOnePoll(id);

    if (!poll) {
      throw new HttpException(404, "Not Found");
    }

    res.status(200).json(new ResponseDto({ data: poll }));
  }

  static async createPoll(req: Request, res: Response) {
    let poll = await PollService.createPoll(new PollDto(req));

    res.status(201).json(new ResponseDto({ data: poll }));
  }

  static async updatePoll(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    let poll = await PollService.getOnePoll(id);

    if (!poll) {
      throw new HttpException(404, "Not Found");
    }

    poll = await PollService.updatePoll(id, new PollDto(req));

    res.status(200).json(new ResponseDto({ data: poll }));
  }

  static async deletePoll(req: Request, res: Response) {
    const { id } = req.params;

    let poll = await PollService.getOnePoll(id);

    if (!poll) {
      throw new HttpException(404, "Not Found");
    }

    await PollService.deletePoll(id);
    
    res.status(204).json(new ResponseDto({ data: null }));
  }
}
