"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clarification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clarification.belongsTo(models.Contest);
    }
  }
  Clarification.init(
    {
      contestId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Contests",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: DataTypes.STRING,
      details: DataTypes.TEXT,
      postTime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Clarification",
    }
  );
  return Clarification;
};
