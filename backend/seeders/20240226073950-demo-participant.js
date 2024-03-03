"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Participants",
      [
        { contestId: 1, userId: 10, type: 0 },
        { contestId: 1, userId: 11, type: 0 },
        { contestId: 1, userId: 12, type: 0 },
        { contestId: 1, userId: 13, type: 0 },
        { contestId: 1, userId: 14, type: 0 },
        { contestId: 1, userId: 18, type: 0 },
        { contestId: 1, userId: 37, type: 0 },
        { contestId: 1, userId: 40, type: 0 },
        { contestId: 1, userId: 41, type: 0 },
        { contestId: 1, userId: 42, type: 0 },
        { contestId: 1, userId: 43, type: 0 },
        { contestId: 1, userId: 44, type: 0 },
        { contestId: 1, userId: 45, type: 0 },
        { contestId: 1, userId: 46, type: 0 },
        { contestId: 1, userId: 47, type: 0 },
        { contestId: 1, userId: 48, type: 0 },
        { contestId: 1, userId: 49, type: 0 },
        { contestId: 1, userId: 7, type: 1 },
        { contestId: 2, userId: 7, type: 0 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Participants", null, {});
  },
};
