"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContestSetter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContestSetter.belongsTo(models.Contest, {
        foreignKey: "contestId",
        as: "contest",
      });
      ContestSetter.belongsTo(models.User, {
        foreignKey: "setterId",
        as: "setter",
      });
    }
  }
  ContestSetter.init(
    {
      contestId: DataTypes.INTEGER,
      setterId: DataTypes.INTEGER,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ContestSetter",
    }
  );
  return ContestSetter;
};
