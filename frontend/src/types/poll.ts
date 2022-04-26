export type Poll = {
  startAt: string;
  endAt: string;
  image: string;
  description: string;
  address: string;
  question: string,
  multipleVote: boolean;
  answers: string[];
}
