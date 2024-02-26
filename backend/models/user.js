"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Setter, { foreignKey: "userId" });
      User.hasOne(models.DailyActivity, { foreignKey: "userId" });
      User.hasOne(models.Credential, {
        foreignKey: "userId",
        as: "credential",
      });
      User.hasMany(models.Activity, { foreignKey: "userId" });
      User.hasMany(models.Submission, { foreignKey: "userId" });
      User.hasMany(models.UserRating, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      image: DataTypes.TEXT,
      // role: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
