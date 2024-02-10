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
      ContestSetter.belongsTo(models.Contest, { foreignKey: "contestId",  as: "contest"});
      ContestSetter.belongsTo(models.Setter, { foreignKey: "userId", as: "setter" });
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
          key: "userId",
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
