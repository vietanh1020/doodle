import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface VoteAttributes {
  fullName: string;
  answer: string;
  pollId: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface VoteModel extends Model<VoteAttributes>, VoteAttributes {
  id: number;
}
export class Vote extends Model<VoteModel, VoteAttributes> {}

export type VoteStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): VoteModel;
};

export function VoteFactory(sequelize: Sequelize): VoteStatic {
  return <VoteStatic>sequelize.define("Votes", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null
    },

    answer: {
      type: DataTypes.JSON,
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
