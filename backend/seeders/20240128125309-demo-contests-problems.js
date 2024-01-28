'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "contestproblem",
      [
        {
          //id: 1,
          contest_id: 1,
          problem_id: 73,
          status: "published",
          rating: 200,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contestproblem", null, {});
  },
};
