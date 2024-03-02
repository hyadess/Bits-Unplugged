"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Contests",
      [
        {
          //id: 1,
          title: "Demo Contest 1",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "1",
          status: "scheduled",
          ownerId: 2,
          difficulty: "Medium",
          editorial: JSON.stringify([
            {
              boxId: 1,
              type: "markdown",
              data: "# Introduction \n The Tower of Hanoi is a classic mathematical puzzle that has captivated minds for centuries. Initially invented by the French mathematician Édouard Lucas in the late 19th century, the Tower of Hanoi has since become a popular problem in the realms of computer science, recreational mathematics, and even psychology.",
            },
            {
              boxId: 2,
              type: "slideshow",
              images: JSON.stringify([
                { url: "/images/toh_1.png", caption: "Caption 1" },
                { url: "/images/toh_2.png", caption: "Caption 2" },
                { url: "/images/toh_3.png", caption: "Caption 3" },
                { url: "/images/toh_4.png", caption: "Caption 4" },
                { url: "/images/toh_5.png", caption: "Caption 5" },
                { url: "/images/toh_6.png", caption: "Caption 6" },
                { url: "/images/toh_7.png", caption: "Caption 7" },
                { url: "/images/toh_8.png", caption: "Caption 8" },
              ]),
            },
          ]),
        },
        {
          //id: 2,
          title: "Demo Contest 2",
          description: "Demo contest description",
          startDateTime: new Date(new Date().getTime() + 60 * 1000),
          duration: "2.5",
          status: "scheduled",
          difficulty: "Hard",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 3,
          title: "Demo Contest 3",
          description: "Demo contest description",
          startDateTime: new Date(new Date().getTime() + 60 * 1000),
          duration: "0.01",
          status: "scheduled",
          ownerId: 2,
          difficulty: "Easy",
          editorial: JSON.stringify([]),
        },
        {
          //id: 4,
          title: "Demo Contest 4",
          description: "Demo contest description",
          startDateTime: new Date(new Date().getTime() + 120 * 1000),
          duration: "0.01",
          status: "scheduled",
          ownerId: 2,
          difficulty: "Medium",
          editorial: JSON.stringify([]),
        },
        {
          //id: 5,
          title: "Demo Contest 5",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "approved",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 6,
          title: "Demo Contest 6",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 7,
          title: "Demo Contest 7",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 8,
          title: "Demo Contest 8",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contests", null, {});
  },
};
