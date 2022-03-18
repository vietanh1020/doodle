import { Sequelize } from "sequelize";
import { UserFactory, UserStatic } from "./users";
import { PollFactory, PollStatic } from "./polls";
import { CommentFactory, CommentStatic } from "./comments";
import { VoteFactory, VoteStatic } from "./votes";

export interface DB {
  sequelize: Sequelize;
  User: UserStatic;
  Vote: VoteStatic;
  Comment: CommentStatic;
  Poll: PollStatic;
}

const sequelize = new Sequelize(
  (process.env.DB_DATA = "doodle"),
  (process.env.DB_USER = "abc"),
  (process.env.DB_PASS = "p4ssword"),
  {
    port: Number(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST || "mysql",
    dialect: "mysql",
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const User = UserFactory(sequelize);
const Vote = VoteFactory(sequelize);
const Comment = CommentFactory(sequelize);
const Poll = PollFactory(sequelize);

export const db: DB = {
  sequelize,
  User,
  Vote,
  Poll,
  Comment,
};
