"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contest.hasMany(models.ContestSetter, {
        foreignKey: "contestId",
        as: "setters",
      });
      Contest.hasMany(models.ContestProblem, {
        foreignKey: "contestId",
        as: "problems",
      });
      // Contest.hasMany(models.Clarification);
    }
  }
  Contest.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      // startDate: DataTypes.DATE,
      // endDate: DataTypes.DATE,
      startDateTime: DataTypes.DATE,
      duration: DataTypes.FLOAT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Contest",
    }
  );
  return Contest;
};
