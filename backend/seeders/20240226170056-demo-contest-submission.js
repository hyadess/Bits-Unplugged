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
          verdict: "Wrong answer",
          points: 0,
          duration: 45,
          submittedAt: 125000,
        },
        {
          participantId: 1,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 129,
          duration: 167,
          submittedAt: 225000,
        },
        {
          participantId: 1,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 90,
          submittedAt: 355000,
        },
        {
          participantId: 1,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 40,
          submittedAt: 425000,
        },
        {
          participantId: 1,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 220,
          duration: 167,
          submittedAt: 325000,
        },
        {
          participantId: 1,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 129,
          duration: 167,
          submittedAt: 525000,
        },
        {
          participantId: 1,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 129,
          duration: 167,
          submittedAt: 925000,
        },
        {
          participantId: 1,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 229,
          duration: 167,
          submittedAt: 1225000,
        },
        {
          participantId: 1,
          contestProblemId: 6,
          verdict: "Accepted",
          points: 329,
          duration: 167,
          submittedAt: 2225000,
        },
        {
          participantId: 1,
          contestProblemId: 7,
          verdict: "Accepted",
          points: 429,
          duration: 167,
          submittedAt: 3225000,
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
