"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Series extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Series.belongsTo(models.Topic, { foreignKey: "topicId", as: "topic" });
      Series.hasMany(models.ProblemVersion, { foreignKey: "seriesId" });
    }
  }
  Series.init(
    {
      topicId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      logo: DataTypes.TEXT,
      isLive: DataTypes.BOOLEAN,
      serialNo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Series",
    }
  );
  return Series;
};
