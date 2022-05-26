import { db } from "../models";
import { VoteModel } from "../models/votes";

export class VoteService {
  static async getPoll(id: string) {
    return await db.User.findOne({
      attributes: ["id", "firstName", "LastName"],
      include: [
        {
          model: db.Poll,
          where: { id: id },
        },
      ],
    });
  }

  static async vote(vote: VoteModel, pollId: number): Promise<VoteModel | null> {
    return await db.Vote.create({...vote, pollId});
  }
}
