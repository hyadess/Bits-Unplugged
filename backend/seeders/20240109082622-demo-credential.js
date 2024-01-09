'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Credentials",
      [
        {
          // id: 1,
          userId: 1,
          email: "mahirlabibdihan@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 2,
          userId: 2,
          email: "mahirlabibdihan@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 3,
          userId: 3,
          email: "sayemshahadsoummo@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 4,
          userId: 4,
          email: "sayemshahadsoummo@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 5,
          userId: 5,
          email: "souvik7701@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 6,
          userId: 6,
          email: "souvik7701@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Credentials", null, {});
  }
};
