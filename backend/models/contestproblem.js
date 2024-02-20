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
    }
  }
  ContestProblem.init(
    {
      contestId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Contests",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      problemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Problems",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
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
