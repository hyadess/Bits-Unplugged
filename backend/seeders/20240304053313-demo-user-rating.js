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
    await queryInterface.bulkInsert(
      "UserRatings",
      [
        {
          //id: 1,
          userId: 7,
          rating: 850,
          isLatest: false,
          contestId: 9,
          change: 50,
          prevRating: 800,
          rank: 23,
          createdAt: new Date("January 5, 2024 06:00"),
        },
        {
          //id: 1,
          userId: 7,
          rating: 860,
          isLatest: false,
          contestId: 10,
          change: 10,
          prevRating: 850,
          rank: 43,
          createdAt: new Date("January 25, 2024 03:00"),
        },
        {
          //id: 1,
          userId: 7,
          rating: 950,
          isLatest: false,
          contestId: 11,
          change: 90,
          prevRating: 860,
          rank: 3,
          createdAt: new Date("February 25, 2024 15:00"),
        },
        {
          //id: 1,
          userId: 7,
          rating: 890,
          isLatest: true,
          contestId: 12,
          change: -60,
          prevRating: 950,
          rank: 15,
          createdAt: new Date("March 4, 2024 20:00"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserRatings", null, {});
  },
};
