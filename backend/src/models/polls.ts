import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface PollAttributes {
  id : number;
  question: string;
  image?: string;
  description?: string;
  address?: string;
  map?: string;
  startAt: Date;
  endAt: Date;
  answers: string;
  multipleVote: boolean;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface PollModel extends Model<PollAttributes>, PollAttributes {
}
export class Poll extends Model<PollModel, PollAttributes> {}

export type PollStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PollModel;
};

export function PollFactory(sequelize: Sequelize): PollStatic {
  return <PollStatic>sequelize.define("Polls", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    map: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    multipleVote: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
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
