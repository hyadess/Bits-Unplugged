"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Articles",
      [
        {
          // id: 1,
          seriesId: 1,
          title: "Basic Tower of Hanoi",
          content: JSON.stringify([
            {
              type: "markdown",
              data: `# The Tower of Hanoi: A Fascinating Puzzle of Mathematical Beauty.`,
            },
            {
              type: "markdown",
              data: `# Introduction \n The Tower of Hanoi is a classic mathematical puzzle that has captivated minds for centuries. Initially invented by the French mathematician Édouard Lucas in the late 19th century, the Tower of Hanoi has since become a popular problem in the realms of computer science, recreational mathematics, and even psychology.`,
            },
            {
              type: "markdown",
              data: "# The Puzzle \n The puzzle consists of three pegs and a number of disks of different sizes, which can slide onto any peg. The challenge is to move the entire stack of disks from one peg to another, with the following rules: \n - Only one disk can be moved at a time. \n - Each move consists of taking the top disk from one of the stacks and placing it on top of another stack. \n - No disk may be placed on top of a smaller disk. \n The goal is to move all the disks from the starting peg to the destination peg, using the spare peg as an intermediary, adhering to the above rules.",
            },
            {
              type: "markdown",
              data: "# Mathematical Properties \n The Tower of Hanoi is not just an intriguing puzzle; it also holds fascinating mathematical properties. The minimum number of moves required to solve the Tower of Hanoi puzzle with nn disks can be calculated using the formula `$$2^{n-1}$$`. This exponential growth in the number of moves required as the number of disks increases illustrates the puzzle's complexity.",
            },
            {
              type: "markdown",
              data: "# Applications \n While the Tower of Hanoi puzzle may seem like a simple recreational activity, it has practical applications in various fields, particularly in computer science. The puzzle serves as a classic example for teaching recursive algorithms and problem-solving techniques. Additionally, it has applications in optimizing the movement of data in computer systems and even in the design of efficient algorithms for robotic motion planning.",
            },
            {
              type: "markdown",
              data: "# Conclusion \n The Tower of Hanoi puzzle is a timeless classic that continues to intrigue and challenge enthusiasts across various disciplines. Its elegant mathematical properties, recursive solution, and practical applications make it a fascinating subject of study. Moreover, its insights into human cognition provide valuable perspectives on problem-solving strategies. Whether as a recreational pastime or a tool for learning and research, the Tower of Hanoi puzzle remains a symbol of mathematical beauty and intellectual curiosity.",
            },
            {
              type: "canvas",
              canvasData: JSON.stringify({
                pegs: [[0, 1, 2], [], []],
              }),
              checkerCode:
                "/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
              editOptions: JSON.stringify({
                customDisk: { value: true, type: "switch" },
                ordered: { value: true, type: "switch" },
              }),
              previewOptions: JSON.stringify({
                moves: { value: false, type: "switch" },
                nDisks: { value: false, type: "switch" },
                customDisk: { value: false, type: "switch" },
                undo: { value: true, type: "switch" },
              }),
              checkerCanvas: JSON.stringify({
                pegs: [[], [], [0, 1, 2]],
              }),
            },
          ]),
          isLive: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};