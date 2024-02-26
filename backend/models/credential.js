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
      Credential.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Credential.init(
    {
      userId: DataTypes.INTEGER,
      email: { type: DataTypes.STRING, unique: "Credentials_userId_role_key" },
      hashpass: DataTypes.STRING,
      role: { type: DataTypes.INTEGER, unique: "Credentials_userId_role_key" },
    },
    {
      sequelize,
      modelName: "Credential",
      // hooks: {
      //   afterCreate: async (credential, options) => {
      //     if (credential.role === 1) {
      //       // Assuming Setter is your other model
      //       // You need to import it at the top of the file
      //       await sequelize.models.Setter.create({
      //         userId: credential.userId,
      //       });
      //     }
      //   },
      // },
    }
  );
  return Credential;
};
