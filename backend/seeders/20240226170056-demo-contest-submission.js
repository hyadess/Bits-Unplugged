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
      "ContestSubmissions",
      [
        {
          participantId: 1,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 129,
          duration: 167,
          submittedAt: 1425000,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', 100, {});
     */
    await queryInterface.bulkDelete("ContestSubmissions", 100, {});
  },
};
