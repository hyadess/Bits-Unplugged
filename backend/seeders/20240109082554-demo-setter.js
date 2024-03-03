"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Setters",
      [
        {
          // id: 1,
          userId: 2,
          isApproved: true,
        },
        {
          // id: 2,
          userId: 3,
          isApproved: true,
        },
        {
          // id: 3,
          userId: 4,
          isApproved: true,
        },
        {
          // id: 3,
          userId: 5,
          isApproved: false,
        },
        {
          // id: 3,
          userId: 6,
          isApproved: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Setters", null, {});
  },
};
