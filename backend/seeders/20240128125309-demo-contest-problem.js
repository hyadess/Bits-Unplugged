"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ContestProblems",
      [
        {
          //id: 1,
          contestId: 1,
          problemId: 1,
          status: "published",
          rating: 200,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ContestProblems", null, {});
  },
};
