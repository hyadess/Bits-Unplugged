"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Activity", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      problemId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Problems",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      conseqFailedAttempt: {
        type: Sequelize.INTEGER,
      },
      isSolved: {
        type: Sequelize.BOOLEAN,
      },
      lastSolveTimestamp: {
        type: Sequelize.DATE,
      },
      lastSuccessfulSolveTimestamp: {
        type: Sequelize.DATE,
      },
      totalFailedAttempt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Activity");
  },
};
