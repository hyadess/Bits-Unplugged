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
          status: "edit",
        },
        {
          //id: 2,
          title: "Demo Contest 2",
          description: "Demo contest description",
          startDateTime: new Date("February 28, 2024 15:05"),
          duration: "2.5",
          status: "requested",
        },
        {
          //id: 3,
          title: "Demo Contest 3",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "approved",
        },
        {
          //id: 4,
          title: "Demo Contest 4",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "scheduled",
        },
        {
          //id: 5,
          title: "Demo Contest 5",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
        },
        {
          //id: 6,
          title: "Demo Contest 6",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
        },
        {
          //id: 7,
          title: "Demo Contest 7",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
        },
        {
          //id: 8,
          title: "Demo Contest 8",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contests", null, {});
  },
};
