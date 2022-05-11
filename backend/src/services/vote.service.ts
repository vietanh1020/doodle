import { VoteDto } from "../dto/VoteDto";
import { db } from "../models";

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

  static async vote(vote: VoteDto) {
    return await db.Vote.create(vote);
  }
}
