"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContestSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContestSubmission.belongsTo(models.Participant, {
        foreignKey: "participantId",
        as: "participant",
      });
      ContestSubmission.belongsTo(models.ContestProblem, {
        foreignKey: "contestProblemId",
        as: "problem",
      });
    }
  }
  ContestSubmission.init(
    {
      participantId: DataTypes.INTEGER,
      contestProblemId: DataTypes.INTEGER,
      verdict: DataTypes.STRING,
      canvasData: DataTypes.JSON,
      userActivity: DataTypes.JSON,
      image: DataTypes.TEXT,
      points: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      submittedAt: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "ContestSubmission",
    }
  );
  return ContestSubmission;
};
