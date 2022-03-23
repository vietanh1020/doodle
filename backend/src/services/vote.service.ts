import { Request } from "express";

import { db } from "../models";

export class VoteService{
  static async getPoll(req : Request){
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
}
