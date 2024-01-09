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
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 2,
          fullname: "Mahir Labib Dihan",
          username: "dihan",
          image:
            "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31",
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 3,
          fullname: "Sayem Shahad Soummo",
          username: "sayemshahadsoummo",
          image:
            "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/au/wp-content/uploads/2022/09/bored_ape_yacht_club.jpeg-1.jpg",
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 4,
          fullname: "Sayem Shahad Soummo",
          username: "sayem",
          image:
            "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/au/wp-content/uploads/2022/09/bored_ape_yacht_club.jpeg-1.jpg",
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 5,
          fullname: "Souvik Ghosh",
          username: "sheldor7701",
          image:
            "https://www.businessinsider.in/thumb.cms?msid=87162740&width=1200&height=900",
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 6,
          fullname: "Souvik Ghosh",
          username: "souvik",
          image:
            "https://www.businessinsider.in/thumb.cms?msid=87162740&width=1200&height=900",
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
