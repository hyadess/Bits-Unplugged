"use strict";
const { Model } = require("sequelize");
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
      name: DataTypes.STRING,
      classname: DataTypes.STRING,
      info: DataTypes.TEXT,
      logo: DataTypes.TEXT,
      editOptions: DataTypes.JSON,
      previewOptions: DataTypes.JSON,
      template: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Canvas",
    }
  );
  return Canvas;
};
