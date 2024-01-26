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
          logo: "https://cdn4.iconfinder.com/data/icons/university-32/500/yul651_20_atom_molecule_business_logo_texture_technology_chemistry-512.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 2,
          name: "Recursion",
          description: null,
          logo: "https://www.svgrepo.com/show/439287/recursion.svg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 3,
          name: "Sorting",
          description: null,
          logo: "https://cdn1.iconfinder.com/data/icons/flat-web-browser/100/sort-512.png",
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
