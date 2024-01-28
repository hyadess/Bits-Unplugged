"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProblemVersions", {
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
        defaultValue: 0,
      },
      isLive: {
        type: Sequelize.BOOLEAN,
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
      previewOptions: {
        type: Sequelize.JSON,
      },
      checkerCode: {
        type: Sequelize.TEXT,
      },
      checkerCanvas: {
        type: Sequelize.JSON,
      },
      approvalStatus: {
        type: Sequelize.INTEGER, // 0 - old (Approved), 1 - latest (Approved), 2 - Pending (At most 1), 3 - Rejected
        defaultValue: 2,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProblemVersions");
  },
};
