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
      Canvas.hasMany(models.ProblemVersion, { foreignKey: "canvasId" });
      Canvas.hasMany(models.Problem, { foreignKey: "canvasId" });
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
      editOptions: {
        type: DataTypes.JSON,
      },
      previewOptions: {
        type: DataTypes.JSON,
      },
      previewOptions: {
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