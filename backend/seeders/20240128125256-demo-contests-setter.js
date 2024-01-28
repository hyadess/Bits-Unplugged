'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "contestsetter",
      [
        {
          //id: 1,
          contest_setter_id: 1,
          contest_id: 1,
          setter_id: 1,
          role: "owner",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contestsetter", null, {});
  },
};
