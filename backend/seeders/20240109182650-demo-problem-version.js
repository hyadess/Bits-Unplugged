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
    await queryInterface.bulkInsert("ProblemVersions", [
      {
        problemId: 1,
        seriesId: 1,
        isLive: true,
        approvalStatus: 1,
        serialNo: 4,
        canvasId: 2,
      },
      {
        problemId: 1,
        seriesId: 1,
        isLive: true,
        approvalStatus: 0,
        feedback: "Problem statement is ambiguous.",
        serialNo: 4,
      },
      {
        problemId: 1,
        seriesId: 1,
        isLive: true,
        approvalStatus: 2,
        serialNo: 4,
      },
      {
        problemId: 2,
        seriesId: 1,
        isLive: true,
        approvalStatus: 1,
        serialNo: 3,
      },
      {
        problemId: 3,
        seriesId: 1,
        isLive: true,
        approvalStatus: 1,
        serialNo: 2,
      },
      {
        problemId: 4,
        seriesId: 1,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 5,
        seriesId: 2,
        isLive: true,
        approvalStatus: 1,
        serialNo: 2,
      },
      {
        problemId: 6,
        seriesId: 2,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 7,
        seriesId: 4,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 8,
        canvasId: 1,
        approvalStatus: 2,
      },
      {
        problemId: 9,
        seriesId: 7,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 10,
        seriesId: 3,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 11,
        seriesId: 6,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 12,
        approvalStatus: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProblemVersions", null, {});
  },
};
