"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Contests",
      [
        {
          //id: 1,
          title: "Demo Contest 1",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.1",
          status: "scheduled",
          ownerId: 2,
        },
        {
          //id: 2,
          title: "Demo Contest 2",
          description: "Demo contest description",
          startDateTime: new Date("February 27, 2024 13:31"),
          duration: "2.5",
          status: "scheduled",
          ownerId: 2,
        },
        {
          //id: 3,
          title: "Demo Contest 3",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "approved",
          ownerId: 2,
        },
        {
          //id: 4,
          title: "Demo Contest 4",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "scheduled",
          ownerId: 2,
        },
        {
          //id: 5,
          title: "Demo Contest 5",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
          ownerId: 2,
        },
        {
          //id: 6,
          title: "Demo Contest 6",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
          ownerId: 2,
        },
        {
          //id: 7,
          title: "Demo Contest 7",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
          ownerId: 2,
        },
        {
          //id: 8,
          title: "Demo Contest 8",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
          ownerId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contests", null, {});
  },
};
