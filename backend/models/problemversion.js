"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProblemVersion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProblemVersion.belongsTo(models.Problem, {
        foreignKey: "problemId",
        as: "problem",
      });
      ProblemVersion.belongsTo(models.Series, {
        foreignKey: "seriesId",
        as: "series",
      });
      ProblemVersion.belongsTo(models.Canvas, {
        foreignKey: "canvasId",
        as: "canvas",
      });
      ProblemVersion.hasMany(models.Submission, {
        as: "submissions",
        foreignKey: "problemId",
      });
      ProblemVersion.hasMany(models.Activity, {
        foreignKey: "problemId",
        as: "activities",
      });
      // ProblemVersion.belongsToMany(models.User, {
      //   through: models.Activity,
      //   foreignKey: "problemId",
      //   as: "users",
      // });
    }
  }
  ProblemVersion.init(
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
      seriesId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Series",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      canvasId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Setters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
      },
      statement: {
        type: DataTypes.TEXT,
      },
      serialNo: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isLive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      version: DataTypes.INTEGER,
      canvasData: {
        type: DataTypes.JSON,
      },
      editOptions: {
        type: DataTypes.JSON,
      },
      previewOptions: {
        type: DataTypes.JSON,
      },
      checkerCode: {
        type: DataTypes.TEXT,
      },
      checkerCanvas: {
        type: DataTypes.JSON,
      },
      approvalStatus: {
        type: DataTypes.INTEGER,
      },
      feedback: {
        type: DataTypes.TEXT,
      },
      rating : {
        type:DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "ProblemVersion",
    }
  );
  return ProblemVersion;
};
