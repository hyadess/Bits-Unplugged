"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Activity.belongsTo(models.ProblemVersion, {
        foreignKey: "problemId",
        as: "problem",
      });
    }
  }
  Activity.init(
    {
      userId: DataTypes.INTEGER,
      problemId: DataTypes.INTEGER,
      conseqFailedAttempt: DataTypes.INTEGER,
      isSolved: DataTypes.BOOLEAN,
      lastSolveTimestamp: DataTypes.DATE,
      lastSuccessfulSolveTimestamp: DataTypes.DATE,
      totalFailedAttempt: DataTypes.INTEGER,
      viewDuration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Activity",
      indexes: [
        {
          fields: ["userId", "problemId"],
          unique: true,
        },
      ],
    }
  );
  return Activity;
};
