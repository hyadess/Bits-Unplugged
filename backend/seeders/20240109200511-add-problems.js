"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Problems",
      [
        {
          setterId: 1,
          canvasId: 2,
          title: "Min 3 Disks",
          statement:
            "You already how to move 3 disks from one peg to another. But can you do it in minimum possible moves?",
          canvasData: JSON.stringify({
            numberOfMoves: 0,
            numberOfDisks: 3,
            numberOfPegs: 3,
            pegs: [[0, 1, 2], [], []],
          }),
          params: JSON.stringify({
            custom_disk: { value: true, type: "switch" },
            ordered: { value: true, type: "switch" },
          }),
          uiParams: JSON.stringify({
            moves: { value: true, type: "switch" },
            n_disks: { value: false, type: "switch" },
            custom_disk: { value: false, type: "switch" },
            undo: { value: true, type: "switch" },
          }),
          controlParams: JSON.stringify({}),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.numberOfMoves == 7 && data.pegs[2].length==3;\n}\n",
          checkerCanvas: JSON.stringify({
            numberOfMoves: 7,
            numberOfDisks: 3,
            numberOfPegs: 3,
            pegs: [[], [], [0, 1, 2]],
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Problems", null, {});
  },
};
