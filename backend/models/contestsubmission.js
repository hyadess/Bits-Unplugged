"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContestSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContestSubmission.belongsTo(models.Participant);
      ContestSubmission.belongsTo(models.Submission);
    }
  }
  ContestSubmission.init(
    {
      participantId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Participants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      submissionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Submissions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      points: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ContestSubmission",
    }
  );
  return ContestSubmission;
};
