'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Canvas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Canvas.hasMany(models.LiveProblem);
      Canvas.hasMany(models.Problem);
    }
  }
  Canvas.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      classname: {
        type: DataTypes.STRING,
      },
      info: {
        type: DataTypes.TEXT,
      },
      logo: {
        type: DataTypes.TEXT,
      },
      params: {
        type: DataTypes.JSON,
      },
      controlParams: {
        type: DataTypes.JSON,
      },
      uiParams: {
        type: DataTypes.JSON,
      },
      template: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Canvas",
    }
  );
  return Canvas;
};