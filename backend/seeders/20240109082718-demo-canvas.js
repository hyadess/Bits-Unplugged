"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Canvases",
      [
        {
          // id: 1,
          name: "Graph",
          classname: "GraphComponent",
          info: "Click anywhere in the canvas to create nodes. Click on two nodes to create an edge between them. You can also drag nodes.",
          logo: "https://cdn0.iconfinder.com/data/icons/graph-4/100/graph1-512.png",
          editOptions: JSON.stringify({
            // variant: {
            //   value: "simple_graph",
            //   type: "select",
            //   list: ["simple_graph", "tree"],
            // },
            directedEdge: { value: false, type: "switch" },
            weightedEdge: { value: false, type: "switch" },
          }),
          previewOptions: JSON.stringify({
            addNode: { value: false, type: "switch" },
            deleteNode: { value: false, type: "switch" },
            dragNode: { value: false, type: "switch" },
            addEdge: { value: false, type: "switch" },
            deleteEdge: { value: false, type: "switch" },
            editWeight: { value: false, type: "switch" },
            editColor: { value: false, type: "switch" },
          }),
          template:
            "/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 2,
          name: "Tower of Hanoi",
          classname: "TowerOfHanoi",
          info: "Drag and drop top most stacks from one peg to another.\nYou can increase the number of disks direcly from the top left spinner.\nOr you can add disks of different sizes from the bottom spinner. Choose your disk of your preffered size and drag and drop in the pegs.\nAt most 10 disks can be in each peg.\nYou cannot put larger disks over smaller ones.",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbAENY_duGomNEm95iTrLS6t6phHPiZ0pSAbgIwhXTOYCcIvfcj1z6QiSeM_PQblTkfoU&usqp=CAU",
          editOptions: JSON.stringify({
            customDisk: { value: true, type: "switch" },
            ordered: { value: true, type: "switch" },
          }),
          previewOptions: JSON.stringify({
            moves: { value: true, type: "switch" },
            nDisks: {  value: false, type: "switch" },
            customDisk: { value: false, type: "switch" },
            undo: { value: true, type: "switch" },
          }),
          template:
            "/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Canvases", null, {});
  },
};
