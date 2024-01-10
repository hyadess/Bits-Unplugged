"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Problems",
      [
        {
          // id: 36,
          setterId: 1,
          canvasId: 2,
          title: "Double TOH",
          statement: "Move the disks from left peg to right peg.",
          canvasData: JSON.stringify({
            numberOfMoves: 0,
            numberOfDisks: 10,
            numberOfPegs: 3,
            pegs: [[0, 10, 2, 12, 4, 14, 6, 16, 8, 18], [], []],
          }),
          editOptions: JSON.stringify({
            customDisk: { value: true, type: "switch" },
            ordered: { value: true, type: "switch" },
          }),
          previewOptions: JSON.stringify({
            moves: { value: true, type: "switch" },
            nDisks: { value: false, type: "switch" },
            customDisk: { value: false, type: "switch" },
            undo: { value: true, type: "switch" },
          }),
          checkerCode:
            "function solutionChecker(data) {\n  return data.numberOfMoves === 2 * (2 ** (data.numberOfDisks/2) - 1);\n}",
          checkerCanvas: JSON.stringify({
            numberOfMoves: 62,
            numberOfDisks: 10,
            numberOfPegs: 3,
            pegs: [[], [], [10, 0, 2, 12, 4, 14, 6, 16, 8, 18]],
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
          editOptions: JSON.stringify({
            customDisk: { value: true, type: "switch" },
            ordered: { value: true, type: "switch" },
          }),
          previewOptions: JSON.stringify({
            moves: { value: true, type: "switch" },
            nDisks: { value: false, type: "switch" },
            customDisk: { value: false, type: "switch" },
            undo: { value: true, type: "switch" },
          }),
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
