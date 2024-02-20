"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Credentials",
      [
        {
          // id: 1,
          userId: 1,
          email: "mahirlabibdihan@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 1,
        },
        {
          // id: 2,
          userId: 2,
          email: "mahirlabibdihan@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          // id: 3,
          userId: 3,
          email: "sayemshahadsoummo@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 1,
        },
        {
          // id: 4,
          userId: 4,
          email: "sayemshahadsoummo@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          // id: 5,
          userId: 5,
          email: "souvik7701@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 1,
        },
        {
          // id: 6,
          userId: 6,
          email: "souvik7701@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          // id: 7,
          userId: 7,
          // email: "admin@bitsunplugged.onrender.com",
          email: "mahirlabibdihan@gmail.com",
          hashpass:
            "$2a$10$yGG7Td2huTYO8YUlbRQKb.lJ6aNCYuhkMivF/yAxygtnF81MoHcTK",
          role: 2,
        },
        {
          // id: 8,
          userId: 8,
          email: "1905067@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 1,
        },
        {
          // id: 9,
          userId: 9,
          email: "1905061@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 1,
        },
        {
          userId: 10,
          email: "1905010@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 11,
          email: "1905011@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 12,
          email: "1905012@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 13,
          email: "1905013@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 14,
          email: "1905014@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 15,
          email: "1905015@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 16,
          email: "1905016@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 17,
          email: "1905017@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 18,
          email: "1905018@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 19,
          email: "1905019@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 20,
          email: "1905020@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 21,
          email: "1905021@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 22,
          email: "1905022@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 23,
          email: "1905023@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 24,
          email: "1905024@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 25,
          email: "1905025@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 26,
          email: "1905026@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 27,
          email: "1905027@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 28,
          email: "1905028@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Credentials", null, {});
  },
};
