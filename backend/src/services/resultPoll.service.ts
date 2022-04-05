import { Request } from "express";
import { HttpException } from "../utils/exceptions/HttpException";
import { db } from "../models";

export class ResultService {
  static async getAnswersByPollId(pollId: number) {
    let pollAnswers = db.Poll.findOne({
      attributes: ["answers"],
      where: { id: pollId },
    });
    if (!pollAnswers) {
      throw new HttpException(500, "Không tìm thấy Poll");
    }

    return pollAnswers;
  }

  static async getAnswerByVote(_pollId: number) {
    let listAnswer = db.Vote.findAll({
      attributes: ["answer"],
      where: { pollId: _pollId },
    });
    if (!listAnswer) {
      throw new HttpException(500, "Không tìm thấy Vote");
    }

    return listAnswer;
  }

  static async resultPoll(pollId: any) {
    const pollAnswers: any = await ResultService.getAnswersByPollId(pollId);
    const voteAnswers: any = await ResultService.getAnswerByVote(pollId);

    if (!pollAnswers) {
      throw new HttpException(500, "Error get data Poll");
    }

    if (!voteAnswers) {
      throw new HttpException(500, "Error get data Vote");
    }

    // Lấy danh sách đáp án của câu hỏi
    let pollAnswersData = JSON.parse(pollAnswers.dataValues.answers);
    let result: any = {};

    // Đếm số lượng câu trả lời
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
