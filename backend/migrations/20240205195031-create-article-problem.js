"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ArticleProblems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      articleId: {
        type: Sequelize.INTEGER,
      },
      serialNo: {
        type: Sequelize.INTEGER,
      },
      canvasId: {
        type: Sequelize.INTEGER,
      },
      canvasData: {
        type: Sequelize.JSON,
      },
      editOptions: {
        type: Sequelize.JSON,
      },
      previewOptions: {
        type: Sequelize.JSON,
      },
      checkerCode: {
        type: Sequelize.TEXT,
      },
      checkerCanvas: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable("ArticleProblems");
  },
};
