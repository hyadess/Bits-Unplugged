'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LiveProblem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LiveProblem.belongsTo(models.Problem);
      LiveProblem.belongsTo(models.Series);
      LiveProblem.belongsTo(models.Canvas);
    }
  }
  LiveProblem.init(
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
      },
      isLive: {
        type: DataTypes.BOOLEAN,
      },
      canvasData: {
        type: DataTypes.JSON,
      },
      editOptions: {
        type: DataTypes.JSON,
      },
      previewOptions: {
        type: DataTypes.JSON,
      },
      previewOptions: {
        type: DataTypes.JSON,
      },
      checkerCode: {
        type: DataTypes.TEXT,
      },
      checkerCanvas: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "LiveProblem",
    }
  );
  return LiveProblem;
};