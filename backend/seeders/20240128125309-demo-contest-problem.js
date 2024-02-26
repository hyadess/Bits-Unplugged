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
        {
          //id: 1,
          contestId: 1,
          problemId: 5,
          status: "published",
          rating: 400,
        },
        {
          //id: 1,
          contestId: 1,
          problemId: 21,
          status: "published",
          rating: 600,
        },
        {
          //id: 1,
          contestId: 1,
          problemId: 9,
          status: "published",
          rating: 800,
        },
        {
          //id: 1,
          contestId: 1,
          problemId: 14,
          status: "published",
          rating: 1000,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ContestProblems", null, {});
  },
};
