'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activity.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        unique: "Activities_userId_problemId_key",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      problemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Problems",
          key: "id",
        },
        unique: "Activities_userId_problemId_key",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
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