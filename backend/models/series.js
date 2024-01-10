'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Series extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Series.belongsTo(models.Topic, { foreignKey: "topicId" });
      Series.hasMany(models.ProblemVersion, { foreignKey: "seriesId" });
    }
  }
  Series.init(
    {
      topicId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Topics",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      logo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Series",
    }
  );
  return Series;
};