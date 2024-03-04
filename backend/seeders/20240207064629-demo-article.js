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
          setterId: 2,
          title: "The Tower of Hanoi",
          subtitle: "A Fascinating Puzzle of Mathematical Beauty",
          approvalStatus: "approved",
          content: JSON.stringify([
            {
              boxId: 1,
              type: "markdown",
              data: "# Introduction \n The Tower of Hanoi is a classic mathematical puzzle that has captivated minds for centuries. Initially invented by the French mathematician Édouard Lucas in the late 19th century, the Tower of Hanoi has since become a popular problem in the realms of computer science, recreational mathematics, and even psychology.",
            },
            {
              boxId: 2,
              type: "markdown",
              data: "# The Puzzle \n The puzzle consists of three pegs and a number of disks of different sizes, which can slide onto any peg. The challenge is to move the entire stack of disks from one peg to another, with the following rules: \n <font size='5'>1\\. Only one disk can be moved at a time. \n 2\\. Each move consists of taking the top disk from one of the stacks and placing it on top of another stack. \n 3\\. No disk may be placed on top of a smaller disk. \n 4\\. The goal is to move all the disks from the starting peg to the destination peg, using the spare peg as an intermediary, adhering to the above rules.</font>",
            },
            {
              boxId: 3,
              type: "markdown",
              data: "# Mathematical Properties \n The Tower of Hanoi is not just an intriguing puzzle; it also holds fascinating mathematical properties. The minimum number of moves required to solve the Tower of Hanoi puzzle with nn disks can be calculated using the formula `$$2^{n-1}$$`. This exponential growth in the number of moves required as the number of disks increases illustrates the puzzle's complexity.",
            },
            {
              boxId: 4,
              type: "markdown",
              data: "# Applications \n While the Tower of Hanoi puzzle may seem like a simple recreational activity, it has practical applications in various fields, particularly in computer science. The puzzle serves as a classic example for teaching recursive algorithms and problem-solving techniques. Additionally, it has applications in optimizing the movement of data in computer systems and even in the design of efficient algorithms for robotic motion planning.",
            },
            {
              boxId: 5,
              type: "markdown",
              data: "# Conclusion \n The Tower of Hanoi puzzle is a timeless classic that continues to intrigue and challenge enthusiasts across various disciplines. Its elegant mathematical properties, recursive solution, and practical applications make it a fascinating subject of study. Moreover, its insights into human cognition provide valuable perspectives on problem-solving strategies. Whether as a recreational pastime or a tool for learning and research, the Tower of Hanoi puzzle remains a symbol of mathematical beauty and intellectual curiosity.",
            },
            {
              boxId: 6,
              type: "markdown",
              data: "# Example \n Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks.",
            },
            {
              boxId: 7,
              type: "canvas",
              canvasId: 2,
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
            {
              boxId: 8,
              type: "markdown",
              data: "# Solution \n Initial Configuration: Let's say you have three rods labeled A, B, and C. Initially, all three disks are stacked on rod A, with the largest disk at the bottom and the smallest at the top. \n Move Disk 1 to Rod C: Start by moving the smallest disk (disk 1) from rod A to rod C. This is the only move possible for the smallest disk. \n Move Disk 2 to Rod B: Next, move the second smallest disk (disk 2) from rod A to rod B. Since we cannot place a larger disk on top of a smaller one, disk 2 must be placed on rod B. \n Move Disk 1 to Rod B: Now, move the smallest disk (disk 1) from rod C to rod B. This completes the transfer of disks 1 and 2 to rod B, with disk 2 being the largest on rod B. \n Move Disk 3 to Rod C: Move the largest disk (disk 3) from rod A to rod C. Since disk 3 is larger than disks 1 and 2, it can be placed on rod C without violating the rules. \n Move Disk 1 to Rod A: Now, move disk 1 from rod B to rod A. This step ensures that disk 1 is positioned on rod A, allowing us to move disk 2 onto disk 3 in the next step. \n Move Disk 2 to Rod C: Finally, move disk 2 from rod B to rod C. Since disk 2 is smaller than disk 3, it can be placed on top of disk 3 without violating the rules.\n Move Disk 1 to Rod C: Optionally, move disk 1 from rod A to rod C. This step is not necessary to complete the Tower of Hanoi with 3 disks, but it can be performed if you want to return all disks to rod C..",
            },
            {
              boxId: 9,
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
            // {
            //   boxId: 9,
            //   type: "video",
            //   url: "https://www.youtube.com/watch?v=2SUvWfNJSsM",
            // },
            // {
            //   boxId: 9,
            //   type: "image",
            //   image: { url: "/images/toh_8.png", caption: "Caption 1" },
            // },
          ]),
          isLive: true,
          serialNo: 2,
        },
        {
          // id: 2
          seriesId: 1,
          setterId: 2,
          title: "The Golden Ratio",
          subtitle: "A Mathematical Marvel in Art and Nature",
          content: JSON.stringify([]),
          isLive: false,
          approvalStatus: "pending",
          serialNo: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};
