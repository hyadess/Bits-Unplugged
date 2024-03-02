"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContestProblem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContestProblem.belongsTo(models.Contest, {
        foreignKey: "contestId",
        as: "contest",
      });
      ContestProblem.belongsTo(models.Problem, {
        foreignKey: "problemId",
        as: "problem",
      });
      ContestProblem.hasMany(models.ContestSubmission, {
        foreignKey: "contestProblemId",
        as: "submissions",
      });
    }
  }
  ContestProblem.init(
    {
      contestId: DataTypes.INTEGER,
      problemId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ContestProblem",
    }
  );
  return ContestProblem;
};
