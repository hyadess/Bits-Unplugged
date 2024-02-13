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
        seriesId: 3,
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
        problemId: 13,
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
        problemId: 14,
        seriesId: 6,
        isLive: true,
        approvalStatus: 1,
        serialNo: 2,
      },
      {
        problemId: 12,
        seriesId: 7,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 15,
        seriesId: 9,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 16,
        seriesId: 10,
        isLive: true,
        approvalStatus: 1,
        serialNo: 2,
      },
      {
        problemId: 20,
        seriesId: 10,
        isLive: true,
        approvalStatus: 1,
        serialNo: 2,
      },
      {
        problemId: 17,
        seriesId: 11,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 18,
        seriesId: 12,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 19,
        seriesId: 13,
        isLive: true,
        approvalStatus: 1,
        serialNo: 1,
      },
      {
        problemId: 1,
        seriesId: 1,
        isLive: true,
        approvalStatus: 3,
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
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProblemVersions", null, {});
  },
};
