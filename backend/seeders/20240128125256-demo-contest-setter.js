"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ContestSetters",
      [
        {
          //id: 1,
          // i: 1,
          contestId: 1,
          setterId: 1,
          role: "owner",
          status: "accepted",
        },
        {
          contestId: 2,
          setterId: 1,
          role: "owner",
          status: "accepted",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ContestSetters", null, {});
  },
};
