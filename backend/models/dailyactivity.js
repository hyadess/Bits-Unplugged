"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DailyActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DailyActivity.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      DailyActivity.belongsTo(models.ProblemVersion, {
        foreignKey: "problemId",
        as: "problem",
      });
    }
  }
  DailyActivity.init(
    {
      userId: DataTypes.INTEGER,
      problemId: DataTypes.INTEGER,
      activityDate: DataTypes.DATE,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DailyActivity",
      indexes: [
        {
          fields: ["userId", "problemId", "activityDate"],
          unique: true,
        },
      ],
    }
  );
  return DailyActivity;
};
