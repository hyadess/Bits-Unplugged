"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Topics",
      [
        {
          // id: 1,
          name: "Graph",
          description: "Nodes and Edges",
          logo: "https://cdn0.iconfinder.com/data/icons/graph-4/100/graph1-512.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 2,
          name: "Recursion",
          description: null,
          logo: "https://i.pinimg.com/originals/a1/2b/a8/a12ba80f3701ef4e7014001e6c1869ac.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 3,
          name: "Sorting",
          description: null,
          logo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Sorting_shaker_sort_anim.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 4,
          name: "Tree",
          description: null,
          logo: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS7-pjys5IOotbaoxbBlxDklbg6YEPMwLcS0GOlOgRtEBWP_bQU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Topics", null, {});
  },
};
