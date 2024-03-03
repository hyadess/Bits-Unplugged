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
          // email: "admin@bitsunplugged.onrender.com",
          email: "mahirlabibdihan@gmail.com",
          hashpass:
            "$2a$10$yGG7Td2huTYO8YUlbRQKb.lJ6aNCYuhkMivF/yAxygtnF81MoHcTK",
          role: 2,
        },
        {
          // id: 2,
          userId: 2,
          email: "mahirlabibdihan@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 1,
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
          email: "souvik7701@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 1,
        },
        {
          // id: 5,
          userId: 5,
          email: "1905067@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 1,
        },
        {
          // id: 6,
          userId: 6,
          email: "1905061@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 1,
        },
        {
          // id: 7,
          userId: 7,
          email: "mahirlabibdihan@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          // id: 8,
          userId: 8,
          email: "sayemshahadsoummo@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          // id: 9,
          userId: 9,
          email: "souvik7701@gmail.com",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
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
        {
          userId: 29,
          email: "1905029@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 30,
          email: "1905030@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 31,
          email: "1905031@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 32,
          email: "1905032@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 33,
          email: "1905033@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 34,
          email: "1905034@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 35,
          email: "1905035@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 36,
          email: "1905036@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 37,
          email: "1905037@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 38,
          email: "1905038@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 39,
          email: "1905039@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 40,
          email: "1905040@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 41,
          email: "1905041@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 42,
          email: "1905045@ugrad.cse.buet.ac.bd",
          hashpass:
            "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
          role: 0,
        },
        {
          userId: 43,
          email: "1905046@ugrad.cse.buet.ac.bd",
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
