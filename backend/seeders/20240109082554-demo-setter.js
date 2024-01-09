'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Setters",
      [
        {
          // id: 1,
          userId: 1,
          isApproved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 2,
          userId: 3,
          isApproved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 3,
          userId: 5,
          isApproved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Setters", null, {});
  }
};
