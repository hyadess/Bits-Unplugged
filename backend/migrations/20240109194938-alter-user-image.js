"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.changeColumn("Users", "image", {
      type: Sequelize.TEXT,
      defaultValue:
        "https://preview.redd.it/tried-to-make-the-discord-clyde-logo-more-similar-to-the-v0-g2bha52fh9v91.png?auto=webp&s=f74e8a7068998d18b22fa3bbb3e62ee9975204d3",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.changeColumn("Users", "image", {
      type: Sequelize.TEXT,
      defaultValue: null,
    });
  },
};
