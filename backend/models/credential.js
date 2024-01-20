"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Credential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Credential.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Credential.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },

        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      email: { type: DataTypes.STRING, unique: "Credentials_userId_role_key" },
      hashpass: DataTypes.STRING,
      role: { type: DataTypes.INTEGER, unique: "Credentials_userId_role_key" },
    },
    {
      sequelize,
      modelName: "Credential",
    }
  );
  return Credential;
};
