"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Articles", {
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
      title: {
        type: Sequelize.STRING,
      },
      subtitle: {
        type: Sequelize.TEXT,
      },
      content: {
        type: Sequelize.JSONB,
      },
      isLive: {
        type: Sequelize.BOOLEAN,
      },
      serialNo: {
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
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Articles");
  },
};
