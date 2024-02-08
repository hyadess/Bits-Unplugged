"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Submissions",
      [
        {
          problemId: 12,
          userId: 2,
          verdict: "Wrong answer",
          canvasData: JSON.stringify({
            edges: [
              { start: "0", end: "1", weight: "4" },
              { start: "0", end: "2", weight: "1" },
              { start: "2", end: "3", weight: "2" },
              { start: "3", end: "4", weight: "4" },
              { start: "4", end: "6", weight: "2" },
              { start: "3", end: "1", weight: "3" },
              { start: "1", end: "4", weight: "4" },
              { start: "6", end: "5", weight: "8" },
              { start: "2", end: "5", weight: "6" },
            ],
            nodes: {
              0: {
                x: 125.60000610351562,
                y: 202.26666259765625,
                label: 0,
                color: "Default",
              },
              1: {
                x: 298.6000061035156,
                y: 71.26666259765625,
                label: 1,
                color: "Default",
              },
              2: {
                x: 271.6000061035156,
                y: 376.26666259765625,
                label: 2,
                color: "Default",
              },
              3: {
                x: 435.6000061035156,
                y: 236.26666259765625,
                label: 3,
                color: "Default",
              },
              4: {
                x: 561.6000061035156,
                y: 64.26666259765625,
                label: 4,
                color: "Default",
              },
              5: {
                x: 600.6000061035156,
                y: 377.26666259765625,
                label: 5,
                color: "Default",
              },
              6: {
                x: 747.6000061035156,
                y: 198.26666259765625,
                label: 6,
                color: "Default",
              },
            },
            selectedEdges: [
              { start: "0", end: "2", weight: "1" },
              { start: "2", end: "3", weight: "2" },
              { start: "3", end: "4", weight: "4" },
              { start: "6", end: "5", weight: "8" },
            ],
            selectedNodes: [],
          }),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Submissions", null, {});
  },
};
