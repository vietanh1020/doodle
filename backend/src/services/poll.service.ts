import { NextFunction, Response, Request } from "express";
import { db } from "../models";

export class PollService {
  static getPollData(req: any) {
    return {
      question: req.body.question,
      image: req.body.image,
      description: req.body.description,
      address: req.body.address,
      map: req.body.map,
      startAt: req.body.startAt,
      endAt: req.body.endAt,
      answers: req.body.answers,
      multipleVote: req.body.multipleVote,
      userId: req.user,
    };
  }

  static async createPoll(req: any) {
    const poll: any = PollService.getPollData(req);
    return await db.Poll.create(poll);
  }

  static async updatePoll(req: any) {
    const poll: any = PollService.getPollData(req);
    return await db.Poll.update(poll, {
      where: {
        id: req.params.id,
      },
    });
  }

  static async deletePoll(req: any){
    return await db.Poll.destroy({
      where: {
        id : req.params.id,
      }
    });
  }
}
