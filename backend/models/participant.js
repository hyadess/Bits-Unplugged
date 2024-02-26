"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Participant.belongsTo(models.Contest, {
        foreignKey: "contestId",
        onDelete: "CASCADE",
      });
      Participant.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      Participant.hasMany(models.ContestSubmission);
    }
  }
  Participant.init(
    {
      contestId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Participant",
    }
  );
  return Participant;
};
