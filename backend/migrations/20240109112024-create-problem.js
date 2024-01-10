"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Problems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      setterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Setters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      canvasId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Canvases",
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
    await queryInterface.dropTable("Problems");
  },
};
