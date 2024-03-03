"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRating.belongsTo(models.User, {
        foreignKey: "userId",
      });
      UserRating.belongsTo(models.Contest, {
        foreignKey: "contestId",
      });
    }
  }
  UserRating.init(
    {
      userId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      isLatest: DataTypes.BOOLEAN,
      contestId: DataTypes.INTEGER,
      change: DataTypes.INTEGER,
      prevRating: DataTypes.INTEGER,
      rank: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserRating",
    }
  );
  return UserRating;
};
