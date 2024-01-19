'use strict';
const {
  Model
} = require('sequelize');
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
      Problem.belongsToMany(models.Contest, { through: models.ContestProblem });
    }
  }
  Problem.init(
    {
      setterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Setters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      canvasId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        references: {
          model: "Canvases",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
      },
      statement: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      canvasData: {
        type: DataTypes.JSON,
      },
      editOptions: {
        type: DataTypes.JSON,
      },
      previewOptions: {
        type: DataTypes.JSON,
      },
      checkerCode: {
        type: DataTypes.TEXT,
      },
      checkerCanvas: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "Problem",
    }
  );
  return Problem;
};