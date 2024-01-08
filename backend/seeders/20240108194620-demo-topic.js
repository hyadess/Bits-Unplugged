"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Topics",
      [
        {
          id: 1,
          name: "Recursion",
          description: null,
          logo: "https://i.pinimg.com/originals/a1/2b/a8/a12ba80f3701ef4e7014001e6c1869ac.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Topics", null, {});
  },
};
