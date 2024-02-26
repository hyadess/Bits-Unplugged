"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ContestSetters",
      [
        {
          //id: 1,
          contestId: 1,
          setterId: 2,
          role: "owner",
          status: "accepted",
        },
        {
          //id: 2,
          contestId: 1,
          setterId: 3,
          role: "collaborator",
          status: "accepted",
        },
        {
          //id: 3,
          contestId: 1,
          setterId: 4,
          role: "collaborator",
          status: "accepted",
        },
        {
          //id: 4,
          contestId: 2,
          setterId: 2,
          role: "owner",
          status: "accepted",
        },
        {
          //id: 5,
          contestId: 3,
          setterId: 2,
          role: "owner",
          status: "accepted",
        },
        {
          //id: 6,
          contestId: 4,
          setterId: 2,
          role: "owner",
          status: "accepted",
        },
        {
          //id: 7,
          contestId: 5,
          setterId: 2,
          role: "owner",
          status: "accepted",
        },
        {
          //id: 8,
          contestId: 6,
          setterId: 2,
          role: "owner",
          status: "accepted",
        },
        {
          //id: 9,
          contestId: 7,
          setterId: 2,
          role: "owner",
          status: "accepted",
        },
        {
          //id: 10,
          contestId: 8,
          setterId: 2,
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
