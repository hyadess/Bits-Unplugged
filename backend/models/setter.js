"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Setter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Setter.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Setter.hasMany(models.Problem, { foreignKey: "setterId" });
      Setter.belongsToMany(models.Contest, { through: models.ContestSetter });
    }
  }
  Setter.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Setter",
    }
  );
  return Setter;
};
