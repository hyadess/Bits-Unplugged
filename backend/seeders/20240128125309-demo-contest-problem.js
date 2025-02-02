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
        {
          //id: 1,
          contestId: 1,
          problemId: 13,
          status: "published",
          rating: 1200,
        },
        {
          //id: 1,
          contestId: 1,
          problemId: 18,
          status: "published",
          rating: 1400,
        },
        {
          //id: 1,
          contestId: 2,
          problemId: 16,
          status: "published",
          rating: 200,
        },
        {
          //id: 1,
          contestId: 2,
          problemId: 2,
          status: "published",
          rating: 400,
        },
        {
          //id: 1,
          contestId: 3,
          problemId: 3,
          status: "published",
          rating: 400,
        },
        {
          //id: 1,
          contestId: 3,
          problemId: 1,
          status: "published",
          rating: 200,
        },
        {
          //id: 1,
          contestId: 3,
          problemId: 5,
          status: "published",
          rating: 100,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ContestProblems", null, {});
  },
};
