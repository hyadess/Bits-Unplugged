"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Problem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Problem.hasOne(models.ProblemVersion, {
        foreignKey: "problemId",
        as: "version",
      });
      Problem.belongsTo(models.Setter, {
        foreignKey: "setterId",
        as: "setter",
      });
      Problem.belongsTo(models.Canvas, {
        foreignKey: "canvasId",
        as: "canvas",
      });
      // Problem.belongsToMany(models.Activity, {
      //   foreignKey: "problemId",
      //   as: "activity",
      // });
      // Problem.hasMany(models.Submission, { foreignKey: "problemId" });
      Problem.hasMany(models.ContestProblem, {
        foreignKey: "problemId",
      });
    }
  }
  Problem.init(
    {
      setterId: DataTypes.INTEGER,
      canvasId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      statement: DataTypes.TEXT,
      canvasData: DataTypes.JSON,
      editOptions: DataTypes.JSON,
      previewOptions: DataTypes.JSON,
      checkerCode: DataTypes.TEXT,
      checkerCanvas: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Problem",
    }
  );
  return Problem;
};
