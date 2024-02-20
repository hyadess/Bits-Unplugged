'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DailyActivities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      activityDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
      }
    });
    await queryInterface.addConstraint("DailyActivities", {
      fields: ["userId", "problemId","activityDate"],
      type: "unique",
      name: "DailyActivities_userId_problemId_activityDate_key",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DailyActivities');
  }
};