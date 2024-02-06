"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ArticleProblem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ArticleProblem.belongsTo(models.Article, {
        foreignKey: "articleId",
        as: "article",
      });
    }
  }
  ArticleProblem.init(
    {
      articleId: DataTypes.INTEGER,
      serialNo: DataTypes.INTEGER,
      canvasId: DataTypes.INTEGER,
      canvasData: DataTypes.JSON,
      editOptions: DataTypes.JSON,
      previewOptions: DataTypes.JSON,
      checkerCode: DataTypes.TEXT,
      checkerCanvas: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "ArticleProblem",
    }
  );
  return ArticleProblem;
};
