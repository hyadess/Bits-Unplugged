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
    }
  }
  Article.init(
    {
      seriesId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Series",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      title: DataTypes.STRING,
      subtitle: DataTypes.TEXT,
      content: DataTypes.JSONB,
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
