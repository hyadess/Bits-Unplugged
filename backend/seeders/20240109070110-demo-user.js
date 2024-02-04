"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          // id: 1,
          fullname: "Mahir Labib Dihan",
          username: "mahirlabibdihan",
          image: "/images/dihan.jpg",
        },
        {
          // id: 2,
          fullname: "Mahir Labib Dihan",
          username: "dihan",
          image: "/images/dihan.jpg",
        },
        {
          // id: 3,
          fullname: "Sayem Shahad Soummo",
          username: "sayemshahadsoummo",
          image: "/images/sayem.jpg",
        },
        {
          // id: 4,
          fullname: "Sayem Shahad Soummo",
          username: "sayem",
          image: "/images/sayem.jpg",
        },
        {
          // id: 5,
          fullname: "Souvik Ghosh",
          username: "sheldor7701",
          image: "/images/souvik.jpg",
        },
        {
          // id: 6,
          fullname: "Souvik Ghosh",
          username: "souvik",
          image: "/images/souvik.jpg",
        },
        {
          // id: 7,
          fullname: null,
          username: "admin",
          image: null,
        },
        {
          // id: 8,
          fullname: "Roqunuzzaman Sojib",
          username: "roqun",
          image:
            "https://pics.craiyon.com/2023-09-13/c195261e4ae94815a26761786726d83a.webp",
        },
        {
          // id: 9,
          fullname: "Ami Sakib",
          username: "sakib",
          image:
            "https://cdn.prod.www.spiegel.de/images/d2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0.9975262832405689_fpx44.98_fpy48.86.jpg",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
