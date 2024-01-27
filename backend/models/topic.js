"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Topic.hasMany(models.Series, { foreignKey: "topicId" });
    }
  }
  Topic.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      logo: DataTypes.TEXT,
      isLive: DataTypes.BOOLEAN,
      serialNo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Topic",
    }
  );
  return Topic;
};
