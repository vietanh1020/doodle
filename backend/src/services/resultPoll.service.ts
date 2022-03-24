import { Request } from "express";
import { HttpException } from "../exceptions/HttpException";
import { db } from "../models";

export class ResultService {
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

  static resultPoll(pollAnswers : any , voteAnswers: any){
    
    let pollAnswersData = JSON.parse(pollAnswers.dataValues.answers);
    let result: any = {};

    for (var key in pollAnswersData) {
      result[pollAnswersData[key]] = 0;
    }

    let answers: any = [];
    voteAnswers.forEach((answer: any) => {
      answers.push(JSON.parse(answer.dataValues.answer));
    });

    answers.forEach((answer: any) => {
      for (let key in answer) {
        result[answer[key]]++;
      }
    });
    
    return result;
  }
}
