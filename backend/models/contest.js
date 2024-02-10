'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contest.belongsToMany(models.Setter, { through: models.ContestSetter });
      Contest.belongsToMany(models.Problem, { through: models.ContestProblem });
      Contest.hasMany(models.Clarification);
      Contest.hasMany(models.ContestSetter, {
        foreignKey: "contestId",
      });
    }
  }
  Contest.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Contest",
    }
  );
  return Contest;
};