"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContestActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContestActivity.belongsTo(models.Participant, {
        foreignKey: "participantId",
        as: "participant",
      });
      ContestActivity.belongsTo(models.ContestProblem, {
        foreignKey: "contestProblemId",
        as: "contestProblem",
      });
    }
  }
  Activity.init(
    {
      participantId: DataTypes.INTEGER,
      contestProblemId: DataTypes.INTEGER,
      conseqFailedAttempt: DataTypes.INTEGER,
      isSolved: DataTypes.BOOLEAN,
      lastSolveTimestamp: DataTypes.DATE,
      lastSuccessfulSolveTimestamp: DataTypes.DATE,
      totalFailedAttempt: DataTypes.INTEGER,
      viewDuration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ContestActivity",
      indexes: [
        {
          fields: ["participantId", "contestProblemId"],
          unique: true,
        },
      ],
    }
  );
  return ContestActivity;
};
