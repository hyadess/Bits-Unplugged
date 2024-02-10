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
      ContestSetter.belongsTo(models.Contest, {
        foreignKey: "contestId",
        onDelete: "CASCADE",
      });
      ContestSetter.belongsTo(models.Setter, {
        foreignKey: "setterId",
        onDelete: "CASCADE",
      });
    }
  }
  ContestSetter.init(
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
      setterId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Setters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ContestSetter",
    }
  );
  return ContestSetter;
};
