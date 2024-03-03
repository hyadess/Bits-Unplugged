'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ContestActivities", {
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
        references: {
          model: "ContestProblems",
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
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addConstraint("ContestActivities", {
      fields: ["participantId", "contestProblemId"],
      type: "unique",
      name: "contestActivity_participantId_contestProblemId_key",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ContestActivities");
  },
};
