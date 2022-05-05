export class PollDto {
  public question: string;
  public image: string;
  public description: string;
  public address: string;
  public map: string;
  public startAt: string;
  public endAt: string;
  public answers: string;
  public multipleVote: boolean;
  public userId: number;

  constructor(req: any) {
    this.question = req.body.question;
    this.image = req.body.image;
    this.description = req.body.description;
    this.address = req.body.address;
    this.map = req.body.map;
    this.startAt = req.body.startAt;
    this.endAt = req.body.endAt;
    this.answers = req.body.answers;
    this.multipleVote = req.body.multipleVote;
    this.userId = req.user;
  }
}
