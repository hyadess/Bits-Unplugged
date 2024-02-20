"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Submission.belongsTo(models.User, { foreignKey: "userId" });
      Submission.belongsTo(models.ProblemVersion, {
        foreignKey: "problemId",
        as: "problem",
      });
      Submission.hasOne(models.ContestSubmission, {
        foreignKey: "submissionId",
      });
    }
  }
  Submission.init(
    {
      problemId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      verdict: DataTypes.STRING,
      canvasData: DataTypes.JSON,
      userActivity: DataTypes.JSON,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
