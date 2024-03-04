"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProblemVersion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProblemVersion.belongsTo(models.Problem, {
        foreignKey: "problemId",
        as: "problem",
      });
      ProblemVersion.belongsTo(models.Series, {
        foreignKey: "seriesId",
        as: "series",
      });
      ProblemVersion.belongsTo(models.Canvas, {
        foreignKey: "canvasId",
        as: "canvas",
      });
      ProblemVersion.hasMany(models.Submission, {
        as: "submissions",
        foreignKey: "problemId",
      });
      ProblemVersion.hasMany(models.Activity, {
        foreignKey: "problemId",
        as: "activities",
      });
      // ProblemVersion.belongsToMany(models.User, {
      //   through: models.Activity,
      //   foreignKey: "problemId",
      //   as: "users",
      // });
    }
  }
  ProblemVersion.init(
    {
      problemId: DataTypes.INTEGER,
      seriesId: DataTypes.INTEGER,
      canvasId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      statement: DataTypes.TEXT,
      serialNo: DataTypes.INTEGER,
      isLive: DataTypes.BOOLEAN,
      version: DataTypes.INTEGER,
      canvasData: DataTypes.JSON,
      editOptions: DataTypes.JSON,
      previewOptions: DataTypes.JSON,
      checkerCode: DataTypes.TEXT,
      checkerCanvas: DataTypes.JSON,
      approvalStatus: DataTypes.INTEGER,
      feedback: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      ratingUpdated: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProblemVersion",
    }
  );
  return ProblemVersion;
};
