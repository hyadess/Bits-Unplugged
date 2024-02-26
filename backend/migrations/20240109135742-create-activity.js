"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Activities", {
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
          model: "ProblemVersions",
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
        type: Sequelize.INTEGER,
      },     
      viewDuration: {
        type: Sequelize.INTEGER,
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
    await queryInterface.addConstraint("Activities", {
      fields: ["userId", "problemId"],
      type: "unique",
      name: "Activities_userId_problemId_key",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Activities");
  },
};
