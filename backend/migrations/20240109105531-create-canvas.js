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
        defaultValue: "",
      },
      logo: {
        type: Sequelize.TEXT,
      },
      editOptions: {
        type: Sequelize.JSON,
        defaultValue: {},
      },
      previewOptions: {
        type: Sequelize.JSON,
        defaultValue: {},
      },
      template: {
        type: Sequelize.TEXT,
        defaultValue:
          "function solutionChecker(userCanvas,solutionCanvas,userActivity)\n{\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}",
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
    await queryInterface.dropTable("Canvases");
  },
};
