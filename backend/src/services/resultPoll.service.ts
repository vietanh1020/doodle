import { HttpException } from "../utils/exceptions/HttpException";
import { db } from "../models";

export class ResultService {
  static async getAnswersByPollId(pollId: string) {
    let pollAnswers = db.Poll.findOne({
      attributes: ["answers"],
      where: { id: pollId },
    });
    if (!pollAnswers) {
      throw new HttpException(400, "Poll Not Found");
    }

    return pollAnswers;
  }

  static async getAnswerByVote(pollId: string) {
    let listAnswer = db.Vote.findAll({
      attributes: ["answer"],
      where: { pollId: pollId },
    });
    if (!listAnswer) {
      throw new HttpException(500, "Server Error");
    }

    return listAnswer;
  }

  static async resultPoll(pollId: string) {
    const pollAnswers: any = await ResultService.getAnswersByPollId(pollId);
    if (!pollAnswers) {
      throw new HttpException(500, "Error get data Poll");
    }

    const voteAnswers: any = await ResultService.getAnswerByVote(pollId);
    if (!voteAnswers) {
      throw new HttpException(500, "Error get data Vote");
    }

    // Get answers by PollId
    let pollAnswersData = JSON.parse(pollAnswers.dataValues.answers);
    let result: any = {};

    //
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
