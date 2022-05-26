import { Sequelize } from "sequelize";
import { UserFactory, UserStatic } from "./users";
import { PollFactory, PollStatic } from "./polls";
import { CommentFactory, CommentStatic } from "./comments";
import { VoteFactory, VoteStatic } from "./votes";
import { sequelize } from "../config/dbConfig";

export interface DB {
  sequelize: Sequelize;
  User: UserStatic;
  Vote: VoteStatic;
  Comment: CommentStatic;
  Poll: PollStatic;
}

const User = UserFactory(sequelize);
const Vote = VoteFactory(sequelize);
const Comment = CommentFactory(sequelize);
const Poll = PollFactory(sequelize);

User.hasMany(Poll);
Poll.belongsTo(User);
Poll.hasMany(Comment);
Comment.belongsTo(Poll);
Vote.belongsTo(Poll);
Poll.hasMany(Vote);

export const db: DB = {
  sequelize,
  User,
  Vote,
  Poll,
  Comment,
};
