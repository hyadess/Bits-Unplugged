'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DailyActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DailyActivity.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      }); 
      

    }
  }
  DailyActivity.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      unique: "DailyActivities_userId_activityDate_key",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    activityDate: {
      type:DataTypes.DATEONLY,
      unique: "DailyActivities_userId_activityDate_key",
    },
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DailyActivity',
    indexes: [
      {
        fields: ["userId", "activityDate"],
        unique: true,
      },
    ],
  });
  return DailyActivity;
};