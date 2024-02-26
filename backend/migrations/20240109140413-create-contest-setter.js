"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ContestSetters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contestId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Contests",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      setterId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Setters",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      role: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "Pending",
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ContestSetters");
  },
};
