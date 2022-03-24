import { Request } from "express";
import { HttpException } from "../exceptions/HttpException";
import { db } from "../models";

export class ResultPoll {
  static async getAnswersByPollId(req: Request) {
    let pollAnswers = db.Poll.findOne({
      attributes: ["answers"],
      where: { id: req.params.pollId },
    });
    if (!pollAnswers) {
      throw new HttpException(500, "Không tìm thấy Poll");
    }

    return pollAnswers;
  }

  static async getAnswerByVote(req: Request){
    let listAnswer = db.Vote.findAll({
      attributes: ["answer"],
      where: { pollId : req.params.pollId },
    });
    if (!listAnswer) {
      throw new HttpException(500, "Không tìm thấy Vote");
    }

    return listAnswer;
  }
}
