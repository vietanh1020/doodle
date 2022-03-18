import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CommentAttributes {
  fullName: string;
  content: string;
  pollId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CommentModel
  extends Model<CommentAttributes>,
    CommentAttributes {
  id: number;
}
export class Comment extends Model<CommentModel, CommentAttributes> {}

export type CommentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentModel;
};

export function CommentFactory(sequelize: Sequelize): CommentStatic {
  return <CommentStatic>sequelize.define("Comments", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
