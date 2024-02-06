"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.hasMany(models.ArticleSection, {
        foreignKey: "articleId",
        as: "sections",
      });
      Article.hasMany(models.ArticleProblem, {
        foreignKey: "articleId",
        as: "problems",
      });
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.ARRAY(DataTypes.JSON),
      isLive: DataTypes.BOOLEAN,
      serialNo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
