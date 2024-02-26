"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmailVerification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EmailVerification.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  EmailVerification.init(
    {
      userId: DataTypes.INTEGER,
      token: DataTypes.TEXT,
      isVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "EmailVerification",
    }
  );
  return EmailVerification;
};
