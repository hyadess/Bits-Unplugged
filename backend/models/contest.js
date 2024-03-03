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
      Contest.hasMany(models.Collaborator, {
        foreignKey: "contestId",
        as: "collaborators",
      });
      Contest.hasMany(models.ContestProblem, {
        foreignKey: "contestId",
        as: "problems",
      });
      Contest.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: "owner",
      });
      Contest.hasMany(models.UserRating, {
        foreignKey: "contestId",
        as: "ratings",
      });
      // Contest.hasMany(models.Clarification);
    }
  }
  Contest.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      startDateTime: DataTypes.DATE,
      duration: DataTypes.FLOAT,
      status: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
      difficulty: DataTypes.STRING,
      editorial: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "Contest",
    }
  );
  return Contest;
};
