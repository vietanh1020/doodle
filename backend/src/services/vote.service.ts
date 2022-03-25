import { Request } from "express";
import { db } from "../models";

export class VoteService {
  static async getPoll(req: Request) {
    return await db.User.findOne({
      attributes: ["id", "firstName", "LastName"],
      include: [
        {
          model: db.Poll,
          where: { id: req.params.pollId },
        },
      ],
    });
  }

  static async vote(req: Request) {

    const voteData : any = {
      email: req.body.email,
      fullName: req.body.fullName,
      answer: req.body.answer,
      pollId: req.params.pollId,
    };

    return await db.Vote.create(voteData)
  }
}
