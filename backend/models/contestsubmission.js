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
        as: "contestProblem",
      });
    }
  }
  ContestSubmission.init(
    {
      participantId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Participants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      contestProblemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ContestProblems",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      verdict: DataTypes.STRING,
      canvasData: DataTypes.JSON,
      userActivity: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      image: DataTypes.TEXT,
      
      points: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ContestSubmission",
    }
  );
  return ContestSubmission;
};
