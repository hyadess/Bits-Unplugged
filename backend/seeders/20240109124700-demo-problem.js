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
          setterId: 1,
          canvasId: 2,
          title: "3 Disks",
          statement:
            "Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks.",
          canvasData: JSON.stringify({
            numberOfMoves: 0,
            numberOfDisks: 3,
            numberOfPegs: 3,
            pegs: [[0, 1, 2], [], []],
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas) && userActivity.numberOfMoves == 7;\n}\n",
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
          checkerCanvas: null,
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
        {
          setterId: 1,
          canvasId: 2,
          title: "Min 4 Disks",
          statement:
            "Move the 4 disks from left to right peg in minimum possible moves.",
          canvasData: JSON.stringify({
            numberOfMoves: 0, // additionData
            numberOfDisks: 4, // can be calculated from pegs
            numberOfPegs: 3, // useless
            pegs: [[0, 1, 2, 3], [], []], // additionalData
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.numberOfMoves == 15 && data.pegs[2].length == 4;\n}\n",
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
          checkerCanvas: JSON.stringify({
            numberOfMoves: 15,
            numberOfDisks: 4,
            numberOfPegs: 3,
            pegs: [[], [], [0, 1, 2, 3]],
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
          canvasId: 1,
          title: "Road Construction",
          statement:
            "There are 5 cities numbered from 0 to 4. We can construct roads between cities. Each road has a number associated with it denoting the cost to construct a road. We want to minimize our cost. **Select the roads from the given canvas in a way that from every city we can go to every other city and cost of constructing the roads are minimum.**",
          canvasData: JSON.stringify({
            edges: [
              { start: "0", end: "1", weight: "10" },
              { start: "3", end: "1", weight: "5" },
              { start: "1", end: "2", weight: "30" },
              { start: "0", end: "4", weight: "2" },
              { start: "4", end: "3", weight: "3" },
              { start: "4", end: "2", weight: "50" },
            ],
            nodes: {
              0: { x: 159, y: 218.8000030517578, label: 0, color: "Default" },
              1: { x: 386, y: 87.80000305175781, label: 1, color: "Default" },
              2: { x: 628, y: 217.8000030517578, label: 2, color: "Default" },
              3: { x: 387, y: 234.8000030517578, label: 3, color: "Default" },
              4: { x: 392, y: 396.8000030517578, label: 4, color: "Default" },
            },
            selectedEdges: [],
          }),
          checkerCode: `/**\n * @param {Object} data (user_data/solution_data) - An object containing nodes and edges properties.\n * @param {Array} data.nodes - HashMap of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end, weight properties.\n * @param {Array} data.selectedEdges - Array of selectedEdges. Where each edge is an object with start, end, weight properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(user_data, solution_data) {\n  return JSON.stringify(user_data) === JSON.stringify(solution_data);\n}\n`,
          editOptions: JSON.stringify({
            // variant: {
            //   value: "simple_graph",
            //   type: "select",
            //   list: ["simple_graph", "tree"],
            // },
            directedEdge: { value: false, type: "switch" },
            weightedEdge: { value: true, type: "switch" },
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
          checkerCanvas: JSON.stringify({
            edges: [
              { start: "0", end: "1", weight: "10" },
              { start: "3", end: "1", weight: "5" },
              { start: "1", end: "2", weight: "30" },
              { start: "0", end: "4", weight: "2" },
              { start: "4", end: "3", weight: "3" },
              { start: "4", end: "2", weight: "50" },
            ],
            nodes: {
              0: { x: 159, y: 218.8000030517578, label: 0, color: "Default" },
              1: { x: 386, y: 87.80000305175781, label: 1, color: "Default" },
              2: { x: 628, y: 217.8000030517578, label: 2, color: "Default" },
              3: { x: 387, y: 234.8000030517578, label: 3, color: "Default" },
              4: { x: 392, y: 396.8000030517578, label: 4, color: "Default" },
            },
            selectedEdges: [
              { start: "0", end: "4", weight: "2" },
              { start: "1", end: "2", weight: "30" },
              { start: "3", end: "1", weight: "5" },
              { start: "4", end: "3", weight: "3" },
            ],
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          setterId: 1,
          canvasId: 1,
          title: "Road Construction 2",
          statement: "Similar to version 1.",

          canvasData: JSON.stringify({
            edges: [
              { start: "0", end: "1", weight: "3" },
              { start: "1", end: "4", weight: "3" },
              { start: "4", end: "6", weight: "3" },
              { start: "3", end: "6", weight: "3" },
              { start: "2", end: "3", weight: "3" },
              { start: "0", end: "2", weight: "3" },
              { start: "5", end: "3", weight: "5" },
              { start: "5", end: "2", weight: "5" },
              { start: "0", end: "5", weight: "5" },
              { start: "1", end: "5", weight: "5" },
              { start: "5", end: "4", weight: "5" },
              { start: "5", end: "6", weight: "5" },
            ],
            nodes: {
              0: { x: 142, y: 196, label: 0, color: "Default" },
              1: { x: 274, y: 45, label: 1, color: "Default" },
              2: { x: 284, y: 357, label: 2, color: "Default" },
              3: { x: 492, y: 358, label: 3, color: "Default" },
              4: { x: 498, y: 41, label: 4, color: "Default" },
              5: { x: 391, y: 197, label: 5, color: "Default" },
              6: { x: 652, y: 205, label: 6, color: "Default" },
            },
            selectedEdges: [],
          }),
          checkerCode: `/**\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction createGraph(edges) {\n  const graph = new Map();\n  for (const edge of edges) {\n    const { start, end, weight } = edge;\n\n    if (!graph.has(start)) {\n      graph.set(start, []);\n    }\n\n    if (!graph.has(end)) {\n      graph.set(end, []);\n    }\n\n    graph.get(start).push({ value: end, weight: parseInt(weight) });\n    graph.get(end).push({ value: start, weight: parseInt(weight) });\n  }\n  return graph;\n}\nfunction getCost(graph) {\n  // Step 3: Implement DFS to check if the graph is disconnected\n  function isDisconnected() {\n    const visited = new Set();\n    const nodes = [...graph.keys()];\n\n    function dfs(node) {\n      visited.add(node);\n      for (const neighbor of graph.get(node)) {\n        if (!visited.has(neighbor.value)) {\n          dfs(neighbor.value);\n        }\n      }\n    }\n    dfs(nodes[0]); // Start DFS from the first node\n    return visited.size !== nodes.length;\n  }\n\n  const disconnected = isDisconnected();\n\n  // Step 4: Calculate the sum of edge weights\n  function sumEdgeWeights() {\n    let sum = 0;\n    for (const edges of graph.values()) {\n      for (const edge of edges) {\n        sum += edge.weight;\n      }\n    }\n    return sum / 2;\n  }\n\n  if (disconnected) return -1;\n\n  const edgeWeightSum = sumEdgeWeights();\n  return edgeWeightSum;\n}\nfunction solutionChecker(user_data, solution_data) {\n  const user_graph = createGraph(user_data.selectedEdges);\n  const setter_graph = createGraph(solution_data.selectedEdges);\n\n  if (Object.keys(user_graph).length !== Object.keys(user_graph).length)\n    return false;\n  const user_cost = getCost(user_graph);\n  const setter_cost = getCost(setter_graph);\n  console.log(user_cost);\n  if (user_cost !== -1 && user_cost === setter_cost) {\n    return true;\n  } else {\n    return false;\n  }\n}\n`,
          editOptions: JSON.stringify({
            // variant: {
            //   value: "simple_graph",
            //   type: "select",
            //   list: ["simple_graph", "tree"],
            // },
            directedEdge: { value: false, type: "switch" },
            weightedEdge: { value: true, type: "switch" },
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
          checkerCanvas: JSON.stringify({
            edges: [
              { start: "0", end: "1", weight: "3" },
              { start: "1", end: "4", weight: "3" },
              { start: "4", end: "6", weight: "3" },
              { start: "3", end: "6", weight: "3" },
              { start: "2", end: "3", weight: "3" },
              { start: "0", end: "2", weight: "3" },
              { start: "5", end: "3", weight: "5" },
              { start: "5", end: "2", weight: "5" },
              { start: "0", end: "5", weight: "5" },
              { start: "1", end: "5", weight: "5" },
              { start: "5", end: "4", weight: "5" },
              { start: "5", end: "6", weight: "5" },
            ],
            nodes: {
              0: { x: 142, y: 196, label: 0, color: "Default" },
              1: { x: 274, y: 45, label: 1, color: "Default" },
              2: { x: 284, y: 357, label: 2, color: "Default" },
              3: { x: 492, y: 358, label: 3, color: "Default" },
              4: { x: 498, y: 41, label: 4, color: "Default" },
              5: { x: 391, y: 197, label: 5, color: "Default" },
              6: { x: 652, y: 205, label: 6, color: "Default" },
            },
            selectedEdges: [
              { start: "0", end: "1", weight: "3" },
              { start: "0", end: "2", weight: "3" },
              { start: "1", end: "4", weight: "3" },
              { start: "2", end: "3", weight: "3" },
              { start: "3", end: "6", weight: "3" },
              { start: "4", end: "6", weight: "3" },
              { start: "5", end: "2", weight: "5" },
            ],
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          setterId: 1,
          canvasId: 1,
          title: "Coloring",
          statement:
            "Draw the graph with only 3 colors. **No nodes should be left to default color.**",
          canvasData: JSON.stringify({
            edges: [
              { start: "8", end: "6", weight: "0" },
              { start: "6", end: "9", weight: "0" },
              { start: "9", end: "5", weight: "0" },
              { start: "5", end: "7", weight: "0" },
              { start: "7", end: "8", weight: "0" },
              { start: "8", end: "3", weight: "0" },
              { start: "9", end: "4", weight: "0" },
              { start: "7", end: "2", weight: "0" },
              { start: "1", end: "6", weight: "0" },
              { start: "0", end: "5", weight: "0" },
              { start: "0", end: "3", weight: "0" },
              { start: "4", end: "2", weight: "0" },
              { start: "4", end: "3", weight: "0" },
              { start: "0", end: "1", weight: "0" },
              { start: "1", end: "2", weight: "0" },
            ],
            nodes: {
              0: { x: 198.79998779296875, y: 232, label: "", color: "Default" },
              1: { x: 444.79998779296875, y: 39, label: "", color: "Default" },
              2: { x: 683.7999877929688, y: 233, label: "", color: "Default" },
              3: { x: 310.79998779296875, y: 431, label: "", color: "Default" },
              4: { x: 590.7999877929688, y: 428, label: "", color: "Default" },
              5: { x: 311.79998779296875, y: 235, label: "", color: "Default" },
              6: { x: 446.79998779296875, y: 142, label: "", color: "Default" },
              7: { x: 579.7999877929688, y: 235, label: "", color: "Default" },
              8: { x: 362.79998779296875, y: 344, label: "", color: "Default" },
              9: { x: 539.7999877929688, y: 345, label: "", color: "Default" },
            },
            selectedEdges: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
          checkerCode: `/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\nfunction solutionChecker(data) {\r\n  // const edges =  data.edges.map(edge => ({\r\n\t// \tstart: edge.start.nodeIndex,\r\n\t// \tend: edge.end.nodeIndex,\r\n\t// \tweight: edge.weight\r\n  // }));\r\n  \r\n\r\n  const allEdgesHaveDifferentColors = data.edges.every(\r\n    edge => data.nodes[edge.start].color !== data.nodes[edge.end].color && data.nodes[edge.end].color !== "Default"); \r\n\r\n  const uniqueColorsSet = new Set();\r\n  data.edges.forEach(edge => {\r\n    uniqueColorsSet.add(data.nodes[edge.start].color);\r\n    uniqueColorsSet.add(data.nodes[edge.end].color);\r\n  });\r\n\r\n  const numberOfUniqueColors = uniqueColorsSet.size;\r\n\r\n  return allEdgesHaveDifferentColors && numberOfUniqueColors == 3;\r\n}`,

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
            dragNode: { value: true, type: "switch" },
            addEdge: { value: false, type: "switch" },
            deleteEdge: { value: false, type: "switch" },
            editWeight: { value: false, type: "switch" },
            editColor: { value: true, type: "switch" },
          }),
          checkerCanvas: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          setterId: 1,
          canvasId: 1,
          title: "Bipartition",
          canvasData: null,
          statement:
            "Remove minimum possible edges, such that the graph is a bipartite graph.",
          checkerCode: `/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}`,
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
            deleteEdge: { value: true, type: "switch" },
            editWeight: { value: false, type: "switch" },
            editColor: { value: false, type: "switch" },
          }),
          checkerCanvas: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          setterId: 1,
          canvasId: 1,
          title: "Rearrange",
          canvasData: null,
          statement:
            "Drag the nodes to make the graph a plane graph. In a plane graph there is no crossing edges.",
          checkerCode: `/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction isIntersecting(a, b, c, d) {\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\n    function ccw(a, b, c) {\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\n    }\n\n    return (\n        ccw(a, c, d) !== ccw(b, c, d) &&\n        ccw(a, b, c) !== ccw(a, b, d)\n    );\n}\n\n\nfunction hasCommonNode(edgeA, edgeB) {\n    return (\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.end) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.end)\n    );\n}\n\nfunction solutionChecker(data) {\n    const nodes = data.nodes;\n    const edges = data.edges;\n\n    for (let i = 0; i < edges.length; i++) {\n        const edgeA = edges[i];\n        \n        const startA = nodes[edgeA.start.nodeIndex];\n        const endA = nodes[edgeA.end.nodeIndex];\n\n        for (let j = i + 1; j < edges.length; j++) {\n            const edgeB = edges[j];\n\n            const startB = nodes[edgeB.start.nodeIndex];\n            const endB = nodes[edgeB.end.nodeIndex];\n\n            if (\n                isIntersecting(startA, endA, startB, endB) &&\n                !hasCommonNode(edgeA, edgeB)\n            ) {\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\n                return false;\n            }\n        }\n    }\n\n    // No intersections found, it's a plane graph\n    return true;\n}`,
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
            addNode: { value: true, type: "switch" },
            deleteNode: { value: true, type: "switch" },
            dragNode: { value: true, type: "switch" },
            addEdge: { value: true, type: "switch" },
            deleteEdge: { value: true, type: "switch" },
            editWeight: { value: false, type: "switch" },
            editColor: { value: false, type: "switch" },
          }),
          checkerCanvas: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          setterId: 1,
          canvasId: 1,
          title: "Shorter Path",
          statement:
            "Select the edges that forms the shortest path from 0 to 6.",
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
            selectedEdges: [],
          }),
          checkerCode: `/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}`,
          editOptions: JSON.stringify({
            // variant: {
            //   value: "simple_graph",
            //   type: "select",
            //   list: ["simple_graph", "tree"],
            // },
            directedEdge: { value: false, type: "switch" },
            weightedEdge: { value: true, type: "switch" },
          }),
          previewOptions: JSON.stringify({
            addNode: { value: false, type: "switch" },
            deleteNode: { value: false, type: "switch" },
            dragNode: { value: false, type: "switch" },
            addEdge: { value: false, type: "switch" },
            deleteEdge: { value: true, type: "switch" },
            editWeight: { value: false, type: "switch" },
            editColor: { value: false, type: "switch" },
          }),

          checkerCanvas: JSON.stringify({
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
              { start: "4", end: "6", weight: "2" },
            ],
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          setterId: 1,
          canvasId: 1,
          title: "Pentagon and Pentagram",
          statement: "Convert the Pentagram to a Pentagon.",
          canvasData: JSON.stringify({
            edges: [
              { start: "3", end: "0", weight: "0" },
              { start: "0", end: "4", weight: "0" },
              { start: "2", end: "4", weight: "0" },
              { start: "1", end: "2", weight: "0" },
              { start: "3", end: "1", weight: "0" },
            ],
            nodes: {
              0: {
                x: 430.79998779296875,
                y: 40.19999694824219,
                label: "",
                color: "Default",
              },
              1: {
                x: 599.7999877929688,
                y: 145.1999969482422,
                label: "",
                color: "Default",
              },
              2: {
                x: 274.79998779296875,
                y: 146.1999969482422,
                label: "",
                color: "Default",
              },
              3: {
                x: 324.79998779296875,
                y: 330.1999969482422,
                label: "",
                color: "Default",
              },
              4: {
                x: 545.7999877929688,
                y: 332.1999969482422,
                label: "",
                color: "Default",
              },
            },
            selectedEdges: [],
          }),
          checkerCode: `/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\n\r\nfunction isIntersecting(a, b, c, d) {\r\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\r\n    function ccw(a, b, c) {\r\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\r\n    }\r\n\r\n    return (\r\n        ccw(a, c, d) !== ccw(b, c, d) &&\r\n        ccw(a, b, c) !== ccw(a, b, d)\r\n    );\r\n}\r\n\r\n\r\nfunction hasCommonNode(edgeA, edgeB) {\r\n    return (\r\n        edgeA.start === edgeB.start ||\r\n        edgeA.start === edgeB.end ||\r\n        edgeA.end === edgeB.start ||\r\n        edgeA.end === edgeB.end\r\n    );\r\n}\r\n\r\nfunction solutionChecker(data) {\r\n    const nodes = data.nodes;\r\n    const edges = data.edges;\r\n\r\n    for (let i = 0; i < edges.length; i++) {\r\n        const edgeA = edges[i];\r\n        \r\n        const startA = nodes[edgeA.start];\r\n        const endA = nodes[edgeA.end];\r\n\r\n        for (let j = i + 1; j < edges.length; j++) {\r\n            const edgeB = edges[j];\r\n\r\n            const startB = nodes[edgeB.start];\r\n            const endB = nodes[edgeB.end];\r\n\r\n            if (\r\n                isIntersecting(startA, endA, startB, endB) &&\r\n                !hasCommonNode(edgeA, edgeB)\r\n            ) {\r\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\r\n                return false;\r\n            }\r\n        }\r\n    }\r\n\r\n    // No intersections found, it's a plane graph\r\n    return true;\r\n}`,
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
            dragNode: { value: true, type: "switch" },
            addEdge: { value: false, type: "switch" },
            deleteEdge: { value: false, type: "switch" },
            editWeight: { value: false, type: "switch" },
            editColor: { value: false, type: "switch" },
          }),
          checkerCanvas: null,
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
