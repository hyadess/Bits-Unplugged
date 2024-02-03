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
          image:
            "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31",
        },
        {
          // id: 2,
          fullname: "Mahir Labib Dihan",
          username: "dihan",
          image:
            "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31",
        },
        {
          // id: 3,
          fullname: "Sayem Shahad Soummo",
          username: "sayemshahadsoummo",
          image:
            "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/au/wp-content/uploads/2022/09/bored_ape_yacht_club.jpeg-1.jpg",
        },
        {
          // id: 4,
          fullname: "Sayem Shahad Soummo",
          username: "sayem",
          image:
            "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/au/wp-content/uploads/2022/09/bored_ape_yacht_club.jpeg-1.jpg",
        },
        {
          // id: 5,
          fullname: "Souvik Ghosh",
          username: "sheldor7701",
          image:
            "https://www.businessinsider.in/thumb.cms?msid=87162740&width=1200&height=900",
        },
        {
          // id: 6,
          fullname: "Souvik Ghosh",
          username: "souvik",
          image:
            "https://www.businessinsider.in/thumb.cms?msid=87162740&width=1200&height=900",
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
