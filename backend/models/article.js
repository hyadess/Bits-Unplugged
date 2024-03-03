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
      Article.belongsTo(models.Series, {
        foreignKey: "seriesId",
        as: "series",
      });
      Article.belongsTo(models.User, {
        foreignKey: "setterId",
        as: "setter",
      });
    }
  }
  Article.init(
    {
      seriesId: DataTypes.INTEGER,
      setterId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      subtitle: DataTypes.TEXT,
      content: DataTypes.JSONB,
      isLive: DataTypes.BOOLEAN,
      serialNo: DataTypes.INTEGER,
      approvalStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
