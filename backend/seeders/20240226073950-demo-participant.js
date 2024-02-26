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
        { contestId: 1, userId: 7, type: 0 },
        { contestId: 1, userId: 8, type: 0 },
        { contestId: 1, userId: 9, type: 0 },
        { contestId: 1, userId: 10, type: 0 },
        { contestId: 1, userId: 11, type: 0 },
        { contestId: 1, userId: 12, type: 0 },
        { contestId: 1, userId: 13, type: 0 },
        { contestId: 1, userId: 14, type: 0 },
        { contestId: 1, userId: 15, type: 0 },
        { contestId: 1, userId: 16, type: 0 },
        { contestId: 1, userId: 17, type: 0 },
        { contestId: 1, userId: 18, type: 0 },
        { contestId: 1, userId: 19, type: 0 },
        { contestId: 1, userId: 20, type: 0 },
        { contestId: 1, userId: 21, type: 0 },
        { contestId: 1, userId: 22, type: 0 },
        { contestId: 1, userId: 23, type: 0 },
        { contestId: 1, userId: 24, type: 0 },
        { contestId: 1, userId: 25, type: 0 },
        { contestId: 1, userId: 26, type: 0 },
        { contestId: 1, userId: 27, type: 0 },
        { contestId: 1, userId: 28, type: 0 },
        { contestId: 1, userId: 29, type: 0 },
        { contestId: 1, userId: 30, type: 0 },
        { contestId: 1, userId: 31, type: 0 },
        { contestId: 1, userId: 32, type: 0 },
        { contestId: 1, userId: 33, type: 0 },
        { contestId: 1, userId: 34, type: 0 },
        { contestId: 1, userId: 35, type: 0 },
        { contestId: 1, userId: 36, type: 0 },
        { contestId: 1, userId: 37, type: 0 },
        { contestId: 1, userId: 38, type: 0 },
        { contestId: 1, userId: 39, type: 0 },
        { contestId: 1, userId: 40, type: 0 },
        { contestId: 1, userId: 41, type: 0 },
        { contestId: 1, userId: 42, type: 0 },
        { contestId: 1, userId: 43, type: 0 },
        { contestId: 1, userId: 44, type: 0 },
        { contestId: 1, userId: 45, type: 0 },
        { contestId: 1, userId: 46, type: 0 },
        { contestId: 1, userId: 47, type: 0 },
        { contestId: 1, userId: 48, type: 0 },
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
