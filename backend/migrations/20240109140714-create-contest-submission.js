"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ContestSubmissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      participantId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Participants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      contestProblemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ContestProblems",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      verdict: {
        type: Sequelize.STRING,
      },
      canvasData: {
        type: Sequelize.JSON,
      },
      userActivity: {
        type: Sequelize.JSON,
        defaultValue: {},
      },
      image: {
        type: Sequelize.TEXT,
      },
      points: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ContestSubmissions");
  },
};
