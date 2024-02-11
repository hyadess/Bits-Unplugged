"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Contests",
      [
        {
          //id: 1,
          title: "Demo Contest",
          description: "Demo contest description",
          startDate: "1/1/2025",
          endDate: "1/2/2025",
          duration: "3",
          status: "requested",
        },
        {
          //id: 1,
          title: "Demo Contest 2",
          description: "Demo contest description",
          startDate: "1/1/2025",
          endDate: "1/2/2025",
          duration: "2.5",
          status: "upcoming",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contests", null, {});
  },
};
