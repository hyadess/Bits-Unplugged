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
          clarification_id: 3,
          title: "demo clarification",
          details: "this is a demo clarification",
          post_time: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contestparticipation", null, {});
  },
};
