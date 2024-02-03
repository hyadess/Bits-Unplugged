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
      User.hasOne(models.DailyActivity, {foreignKey: "userId"});
      User.hasOne(models.Credential, {
        foreignKey: "userId",
        as: "credential",
      });
      // User.belongsToMany(models.ProblemVersion, {
      //   through: models.Activity,
      //   foreignKey: "userId",
      //   as: "problems",
      // });
      User.hasMany(models.Activity, { foreignKey: "userId" });
      User.hasMany(models.Submission, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
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
