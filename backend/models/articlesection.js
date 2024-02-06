"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ArticleSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ArticleSection.belongsTo(models.Article, {
        foreignKey: "articleId",
        as: "article",
      });
    }
  }
  ArticleSection.init(
    {
      articleId: DataTypes.INTEGER,
      serialNo: DataTypes.INTEGER,
      markdown: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ArticleSection",
    }
  );
  return ArticleSection;
};
