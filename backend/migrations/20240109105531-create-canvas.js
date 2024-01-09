"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Canvases", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      classname: {
        type: Sequelize.STRING,
      },
      info: {
        type: Sequelize.TEXT,
      },
      logo: {
        type: Sequelize.TEXT,
      },
      params: {
        type: Sequelize.JSON,
      },
      controlParams: {
        type: Sequelize.JSON,
      },
      uiParams: {
        type: Sequelize.JSON,
      },
      template: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("Canvases");
  },
};
