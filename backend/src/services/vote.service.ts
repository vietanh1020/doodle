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

  static async vote(vote: VoteModel, pollId: number, email: string) {
    const oldvote = await db.Vote.findOne({
      where: {
        email,
        pollId,
      },
    });
    if (!oldvote) {
      return await db.Vote.create({ ...vote, pollId });
    } else {
      return await oldvote.update(vote);
    }
  }
}
