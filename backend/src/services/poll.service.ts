import { db } from "../models";
import { PollModel } from "../models/polls";

export class PollService {
  static async getPollByUserId(userId: number) {
    return await db.Poll.findAll({
      where: { userId },
    });
  }

  static async createPoll(poll: PollModel): Promise<PollModel | null> {
    return await db.Poll.create(poll);
  }

  static async updatePoll(
    id: number,
    data: PollModel
  ): Promise<PollModel | null> {
    const poll = await db.Poll.findByPk(id);
    poll?.update(data);
    return poll;
  }

  static async getOnePoll(
    id: number,
    userId: number
  ): Promise<PollModel | null> {
    const poll = await db.Poll.findOne({
      where: { id, userId },
    });
    return poll;
  }

  static async deletePoll(id, userId) {
    return await db.Poll.destroy({
      where: { id, userId },
    });
  }
}
