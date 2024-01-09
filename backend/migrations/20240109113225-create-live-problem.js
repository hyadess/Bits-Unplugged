"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LiveProblems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      seriesId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Series",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      problemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Problems",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      canvasId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Setters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING,
      },
      statement: {
        type: Sequelize.TEXT,
      },
      serialNo: {
        type: Sequelize.INTEGER,
      },
      isLive: {
        type: Sequelize.BOOLEAN,
      },
      canvasData: {
        type: Sequelize.JSON,
      },
      params: {
        type: Sequelize.JSON,
      },
      uiParams: {
        type: Sequelize.JSON,
      },
      controlParams: {
        type: Sequelize.JSON,
      },
      checkerCode: {
        type: Sequelize.TEXT,
      },
      checkerCanvas: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("LiveProblems");
  },
};
