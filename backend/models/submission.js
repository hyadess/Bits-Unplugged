'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Submission.belongsTo(models.User, { foreignKey: "userId" });
      Submission.belongsTo(models.ProblemVersion, {
        foreignKey: "problemId",
        as: "problem",
      });
      Submission.hasOne(models.ContestSubmission, {
        foreignKey: "submissionId",
      });
    }
  }
  Submission.init(
    {
      problemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Problems",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      verdict: DataTypes.STRING,
      canvasData: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};