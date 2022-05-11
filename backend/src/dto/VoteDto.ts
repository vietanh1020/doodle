export class VoteDto {
  public email: string;
  public fullName: string;
  public answer: string;
  public pollId: number;

  constructor(req: any) {
    this.email = req.body.email;
    this.fullName = req.body.fullName;
    this.answer = req.body.answer;
    this.pollId = req.params.pollId;
  }
}
