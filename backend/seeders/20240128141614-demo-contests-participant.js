'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "contestparticipant",
      [
        {
          //id: 1,
          contest_id: 1,
          participant_id: 3,
          type: "live",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contestparticipant", null, {});
  },
};
