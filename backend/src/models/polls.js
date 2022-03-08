'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Polls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Polls.init({
    question: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    map: DataTypes.STRING,
    startAt: DataTypes.DATE,
    endAt: DataTypes.DATE,
    answer: DataTypes.JSON,
    multipleVote: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Polls',
  });
  return Polls;
};