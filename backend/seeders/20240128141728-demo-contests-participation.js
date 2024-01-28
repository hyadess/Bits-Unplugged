'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "contestparticipation",
      [
        {
          //id: 1,
          contest_id: 1,
          problem_id: 73,
          user_id: 3,
          submission_id: 300,
          points: 150,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contestparticipation", null, {});
  },
};
