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
          // 1
          setterId: 2,
          canvasId: 2,
          title: "3 Disks",
          statement:
            "Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks.",
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
          // 2
          setterId: 3,
          canvasId: 2,
          title: "Min 3 Disks",
          statement:
            "You already how to move 3 disks from one peg to another. But can you do it in minimum possible moves?",
          canvasData: JSON.stringify({
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
            "/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas) && userActivity.numberOfMoves == 7;\n}\n",
          checkerCanvas: JSON.stringify({
            pegs: [[], [], [0, 1, 2]],
          }),
        },
        {
          // 3
          setterId: 4,
          canvasId: 2,
          title: "Min 4 Disks",
          statement:
            "Move the 4 disks from left to right peg in minimum possible moves.",
          canvasData: JSON.stringify({
            pegs: [[0, 1, 2, 3], [], []], // additionalData
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas) && userActivity.numberOfMoves == 15;\n}\n",
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
            pegs: [[], [], [0, 1, 2, 3]],
          }),
        },
        {
          // 4,
          setterId: 2,
          canvasId: 2,
          title: "Double TOH",
          statement: "Move the disks from left peg to right peg.",
          canvasData: JSON.stringify({
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
            "\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas) && userActivity.numberOfMoves == 62;\n}\n",
          checkerCanvas: JSON.stringify({
            pegs: [[], [], [10, 0, 2, 12, 4, 14, 6, 16, 8, 18]],
          }),
        },
        {
          // 5
          setterId: 2,
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
            selectedNodes: [],
          }),
          checkerCode: `/**\n * @param {Object} data (userCanvas/solutionCanvas) - An object containing nodes and edges properties.\n * @param {Array} data.nodes - HashMap of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end, weight properties.\n * @param {Array} data.selectedEdges - Array of selectedEdges. Where each edge is an object with start, end, weight properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas, solutionCanvas) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n`,
          editOptions: JSON.stringify({
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
            editLabel: { value: false, type: "switch" },
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
            selectedNodes: [],
          }),
        },
        {
          // 6
          setterId: 2,
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
            selectedNodes: [],
          }),
          checkerCode: `/**\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction createGraph(edges) {\n  const graph = new Map();\n  for (const edge of edges) {\n    const { start, end, weight } = edge;\n\n    if (!graph.has(start)) {\n      graph.set(start, []);\n    }\n\n    if (!graph.has(end)) {\n      graph.set(end, []);\n    }\n\n    graph.get(start).push({ value: end, weight: parseInt(weight) });\n    graph.get(end).push({ value: start, weight: parseInt(weight) });\n  }\n  return graph;\n}\nfunction getCost(graph) {\n  // Step 3: Implement DFS to check if the graph is disconnected\n  function isDisconnected() {\n    const visited = new Set();\n    const nodes = [...graph.keys()];\n\n    function dfs(node) {\n      visited.add(node);\n      for (const neighbor of graph.get(node)) {\n        if (!visited.has(neighbor.value)) {\n          dfs(neighbor.value);\n        }\n      }\n    }\n    dfs(nodes[0]); // Start DFS from the first node\n    return visited.size !== nodes.length;\n  }\n\n  const disconnected = isDisconnected();\n\n  // Step 4: Calculate the sum of edge weights\n  function sumEdgeWeights() {\n    let sum = 0;\n    for (const edges of graph.values()) {\n      for (const edge of edges) {\n        sum += edge.weight;\n      }\n    }\n    return sum / 2;\n  }\n\n  if (disconnected) return -1;\n\n  const edgeWeightSum = sumEdgeWeights();\n  return edgeWeightSum;\n}\nfunction solutionChecker(userCanvas, solutionCanvas) {\n  const user_graph = createGraph(userCanvas.selectedEdges);\n  const setter_graph = createGraph(solutionCanvas.selectedEdges);\n\n  if (Array.from(user_graph.keys()).length !== Array.from(setter_graph.keys()).length)\n    return false;\n  const user_cost = getCost(user_graph);\n  const setter_cost = getCost(setter_graph);\n  console.log(user_cost);\n  if (user_cost !== -1 && user_cost === setter_cost) {\n    return true;\n  } else {\n    return false;\n  }\n}\n`,
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
            editLabel: { value: false, type: "switch" },
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
            selectedNodes: [],
          }),
        },
        {
          // 7
          setterId: 2,
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
            selectedNodes: [],
          }),
          checkerCode: `/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\nfunction solutionChecker(data) {\r\n  // const edges =  data.edges.map(edge => ({\r\n\t// \tstart: edge.start,\r\n\t// \tend: edge.end,\r\n\t// \tweight: edge.weight\r\n  // }));\r\n  \r\n\r\n  const allEdgesHaveDifferentColors = data.edges.every(\r\n    edge => data.nodes[edge.start].color !== data.nodes[edge.end].color && data.nodes[edge.end].color !== "Default"); \r\n\r\n  const uniqueColorsSet = new Set();\r\n  data.edges.forEach(edge => {\r\n    uniqueColorsSet.add(data.nodes[edge.start].color);\r\n    uniqueColorsSet.add(data.nodes[edge.end].color);\r\n  });\r\n\r\n  const numberOfUniqueColors = uniqueColorsSet.size;\r\n\r\n  return allEdgesHaveDifferentColors && numberOfUniqueColors == 3;\r\n}`,

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
            editLabel: { value: false, type: "switch" },
          }),
          checkerCanvas: null,
        },
        {
          // 8
          setterId: 2,
          canvasId: 1,
          title: "Bipartition",
          canvasData: null,
          statement:
            "Remove minimum possible edges, such that the graph is a bipartite graph.",
          checkerCode: `/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start,\n\t\tend: edge.end,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}`,
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
            editLabel: { value: false, type: "switch" },
          }),
          checkerCanvas: null,
        },
        {
          // id: 9,
          setterId: 2,
          canvasId: 1,
          title: "Rearrange",
          statement:
            "Drag the nodes to make the graph a plane graph. In a plane graph there is no crossing edges.",
          canvasData: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "1",
                weight: "0",
              },
              {
                start: "1",
                end: "3",
                weight: "0",
              },
              {
                start: "3",
                end: "2",
                weight: "0",
              },
              {
                start: "2",
                end: "0",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "7",
                weight: "0",
              },
              {
                start: "7",
                end: "6",
                weight: "0",
              },
              {
                start: "6",
                end: "4",
                weight: "0",
              },
              {
                start: "1",
                end: "5",
                weight: "0",
              },
              {
                start: "4",
                end: "0",
                weight: "0",
              },
              {
                start: "2",
                end: "6",
                weight: "0",
              },
              {
                start: "3",
                end: "7",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 281,
                y: 30,
                label: 0,
                color: "Default",
              },
              1: {
                x: 563,
                y: 31,
                label: 1,
                color: "Default",
              },
              2: {
                x: 281,
                y: 222,
                label: 2,
                color: "Default",
              },
              3: {
                x: 566,
                y: 226,
                label: 3,
                color: "Default",
              },
              4: {
                x: 424,
                y: 148,
                label: 4,
                color: "Default",
              },
              5: {
                x: 703,
                y: 146,
                label: 5,
                color: "Default",
              },
              6: {
                x: 429,
                y: 364,
                label: 6,
                color: "Default",
              },
              7: {
                x: 702,
                y: 366,
                label: 7,
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: false,
              type: "switch",
            },
            weightedEdge: {
              value: false,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: false,
              type: "switch",
            },
            deleteNode: {
              value: false,
              type: "switch",
            },
            dragNode: {
              value: true,
              type: "switch",
            },
            addEdge: {
              value: false,
              type: "switch",
            },
            deleteEdge: {
              value: false,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: {
              value: false,
              type: "switch",
            },
          }),
          checkerCode: `/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction isIntersecting(a, b, c, d) {\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\n    function ccw(a, b, c) {\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\n    }\n\n    return (\n        ccw(a, c, d) !== ccw(b, c, d) &&\n        ccw(a, b, c) !== ccw(a, b, d)\n    );\n}\n\n\nfunction hasCommonNode(edgeA, edgeB) {\n    return (\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.end) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.end)\n    );\n}\n\nfunction solutionChecker(data) {\n    const nodes = data.nodes;\n    const edges = data.edges;\n\n    for (let i = 0; i < edges.length; i++) {\n        const edgeA = edges[i];\n        \n        const startA = nodes[edgeA.start];\n        const endA = nodes[edgeA.end];\n\n        for (let j = i + 1; j < edges.length; j++) {\n            const edgeB = edges[j];\n\n            const startB = nodes[edgeB.start];\n            const endB = nodes[edgeB.end];\n\n            if (\n                isIntersecting(startA, endA, startB, endB) &&\n                !hasCommonNode(edgeA, edgeB)\n            ) {\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\n                return false;\n            }\n        }\n    }\n\n    // No intersections found, it's a plane graph\n    return true;\n}`,
          checkerCanvas: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "1",
                weight: "0",
              },
              {
                start: "1",
                end: "3",
                weight: "0",
              },
              {
                start: "3",
                end: "2",
                weight: "0",
              },
              {
                start: "2",
                end: "0",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "7",
                weight: "0",
              },
              {
                start: "7",
                end: "6",
                weight: "0",
              },
              {
                start: "6",
                end: "4",
                weight: "0",
              },
              {
                start: "1",
                end: "5",
                weight: "0",
              },
              {
                start: "4",
                end: "0",
                weight: "0",
              },
              {
                start: "2",
                end: "6",
                weight: "0",
              },
              {
                start: "3",
                end: "7",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 281,
                y: 30,
                label: 0,
                color: "Default",
              },
              1: {
                x: 563,
                y: 31,
                label: 1,
                color: "Default",
              },
              2: {
                x: 281,
                y: 222,
                label: 2,
                color: "Default",
              },
              3: {
                x: 566,
                y: 226,
                label: 3,
                color: "Default",
              },
              4: {
                x: 424,
                y: 148,
                label: 4,
                color: "Default",
              },
              5: {
                x: 703,
                y: 146,
                label: 5,
                color: "Default",
              },
              6: {
                x: 429,
                y: 364,
                label: 6,
                color: "Default",
              },
              7: {
                x: 702,
                y: 366,
                label: 7,
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
        },
        {
          // 10
          setterId: 2,
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
            selectedNodes: [],
          }),
          checkerCode: `/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas, solutionCanvas) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n`,
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
            editLabel: { value: false, type: "switch" },
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
            selectedNodes: [],
          }),
        },
        {
          // 11
          setterId: 2,
          canvasId: 1,
          title: "Round n Round",
          statement: `Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?`,
          canvasData: JSON.stringify({
            edges: [
              { start: "0", end: "1", weight: "12" },
              { start: "1", end: "2", weight: "8" },
              { start: "0", end: "2", weight: "10" },
              { start: "1", end: "3", weight: "12" },
              { start: "2", end: "3", weight: "11" },
              { start: "2", end: "4", weight: "3" },
              { start: "4", end: "3", weight: "11" },
              { start: "4", end: "5", weight: "6" },
              { start: "5", end: "3", weight: "10" },
              { start: "6", end: "5", weight: "9" },
              { start: "6", end: "4", weight: "7" },
              { start: "6", end: "2", weight: "9" },
              { start: "0", end: "6", weight: "12" },
            ],
            nodes: {
              0: {
                x: 82.16668701171875,
                y: 268.06666564941406,
                label: 0,
                color: "Default",
              },
              1: {
                x: 397.16668701171875,
                y: 55.06666564941406,
                label: 1,
                color: "Default",
              },
              2: {
                x: 345.16668701171875,
                y: 227.06666564941406,
                label: 2,
                color: "Default",
              },
              3: {
                x: 664.1666870117188,
                y: 89.06666564941406,
                label: 3,
                color: "Default",
              },
              4: {
                x: 453.16668701171875,

                y: 300.06666564941406,
                label: 4,
                color: "Default",
              },
              5: {
                x: 656.1666870117188,
                y: 344.06666564941406,
                label: 5,
                color: "Default",
              },
              6: {
                x: 328.16668701171875,
                y: 441.06666564941406,
                label: 6,
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
          checkerCode: `/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n`,
          editOptions: JSON.stringify({
            // variant: {
            //   value: "simple_graph",
            //   type: "select",
            //   list: ["simple_graph", "tree"],

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
            editLabel: { value: false, type: "switch" },
          }),
          checkerCanvas: JSON.stringify({
            edges: [
              { start: "0", end: "1", weight: "12" },
              { start: "1", end: "2", weight: "8" },
              { start: "0", end: "2", weight: "10" },
              { start: "1", end: "3", weight: "12" },
              { start: "2", end: "3", weight: "11" },
              { start: "2", end: "4", weight: "3" },
              { start: "4", end: "3", weight: "11" },
              { start: "4", end: "5", weight: "6" },
              { start: "5", end: "3", weight: "10" },
              { start: "6", end: "5", weight: "9" },
              { start: "6", end: "4", weight: "7" },
              { start: "6", end: "2", weight: "9" },
              { start: "0", end: "6", weight: "12" },
            ],
            nodes: {
              0: {
                x: 82.16668701171875,
                y: 268.06666564941406,
                label: 0,
                color: "Default",
              },
              1: {
                x: 397.16668701171875,
                y: 55.06666564941406,
                label: 1,
                color: "Default",
              },
              2: {
                x: 345.16668701171875,
                y: 227.06666564941406,
                label: 2,
                color: "Default",
              },
              3: {
                x: 664.1666870117188,
                y: 89.06666564941406,
                label: 3,
                color: "Default",
              },
              4: {
                x: 453.16668701171875,
                y: 300.06666564941406,
                label: 4,
                color: "Default",
              },
              5: {
                x: 656.1666870117188,

                y: 344.06666564941406,
                label: 5,

                color: "Default",
              },
              6: {
                x: 328.16668701171875,
                y: 441.06666564941406,
                label: 6,
                color: "Default",
              },
            },
            selectedEdges: [
              { start: "0", end: "1", weight: "12" },
              { start: "0", end: "2", weight: "10" },
              { start: "1", end: "3", weight: "12" },
              { start: "2", end: "4", weight: "3" },
              { start: "5", end: "3", weight: "10" },

              { start: "6", end: "4", weight: "7" },
              { start: "6", end: "5", weight: "9" },
            ],
            selectedNodes: [],
          }),
        },
        {
          setterId: 2,
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
            selectedNodes: [],
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
            editLabel: { value: false, type: "switch" },
          }),
          checkerCanvas: null,
        },
        {
          // id: 13,
          setterId: 2,
          canvasId: 1,
          title: "Dijkstra",
          statement: "Find shortest path from A to F.",
          canvasData: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "1",
                weight: "4",
              },
              {
                start: "0",
                end: "2",
                weight: "2",
              },
              {
                start: "2",
                end: "4",
                weight: "3",
              },
              {
                start: "1",
                end: "2",
                weight: "5",
              },
              {
                start: "1",
                end: "3",
                weight: "10",
              },
              {
                start: "4",
                end: "3",
                weight: "4",
              },
              {
                start: "3",
                end: "5",
                weight: "11",
              },
            ],
            nodes: {
              0: {
                x: 166.79998779296875,
                y: 198.4666748046875,
                label: "A",
                color: "Default",
              },
              1: {
                x: 326.79998779296875,
                y: 71.4666748046875,
                label: "B",
                color: "Default",
              },
              2: {
                x: 316.79998779296875,
                y: 284.4666748046875,
                label: "C",
                color: "Default",
              },
              3: {
                x: 493.79998779296875,
                y: 75.4666748046875,
                label: "D",
                color: "Default",
              },
              4: {
                x: 521.7999877929688,
                y: 275.4666748046875,
                label: "E",
                color: "Default",
              },
              5: {
                x: 700.7999877929688,
                y: 168.4666748046875,
                label: "F",
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: true,
              type: "switch",
            },
            weightedEdge: {
              value: true,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: false,
              type: "switch",
            },
            deleteNode: {
              value: false,
              type: "switch",
            },
            dragNode: {
              value: false,
              type: "switch",
            },
            addEdge: {
              value: false,
              type: "switch",
            },
            deleteEdge: {
              value: false,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: { value: false, type: "switch" },
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "1",
                weight: "4",
              },
              {
                start: "0",
                end: "2",
                weight: "2",
              },
              {
                start: "2",
                end: "4",
                weight: "3",
              },
              {
                start: "1",
                end: "2",
                weight: "5",
              },
              {
                start: "1",
                end: "3",
                weight: "10",
              },
              {
                start: "4",
                end: "3",
                weight: "4",
              },
              {
                start: "3",
                end: "5",
                weight: "11",
              },
            ],
            nodes: {
              0: {
                x: 166.79998779296875,
                y: 198.4666748046875,
                label: "A",
                color: "Default",
              },
              1: {
                x: 326.79998779296875,
                y: 71.4666748046875,
                label: "B",
                color: "Default",
              },
              2: {
                x: 316.79998779296875,
                y: 284.4666748046875,
                label: "C",
                color: "Default",
              },
              3: {
                x: 493.79998779296875,
                y: 75.4666748046875,
                label: "D",
                color: "Default",
              },
              4: {
                x: 521.7999877929688,
                y: 275.4666748046875,
                label: "E",
                color: "Default",
              },
              5: {
                x: 700.7999877929688,
                y: 168.4666748046875,
                label: "F",
                color: "Default",
              },
            },
            selectedEdges: [
              {
                start: "0",
                end: "2",
                weight: "2",
              },
              {
                start: "2",
                end: "4",
                weight: "3",
              },
              {
                start: "3",
                end: "5",
                weight: "11",
              },
              {
                start: "4",
                end: "3",
                weight: "4",
              },
            ],
            selectedNodes: [],
          }),
        },
        {
          // id: 14,
          setterId: 2,
          canvasId: 1,
          title: "Wandering Merchant Dilemma",
          statement:
            "Given a connected graph representing a network of cities and the roads connecting them, your mission is to unravel the optimal cycle for a traveling salesman. The challenge is to identify a closed loop that traverses each city exactly once, allowing the salesman to showcase their merchandise in a cyclic journey. Develop a program to discover the Graphical Sales Circuit in the given graph, providing the sequence of cities that forms the most efficient cycle, ensuring maximum coverage and minimal travel distance.",
          canvasData: JSON.stringify({
            edges: [
              {
                start: "1",
                end: "0",
                weight: "10",
              },
              {
                start: "0",
                end: "2",
                weight: "15",
              },
              {
                start: "1",
                end: "2",
                weight: "35",
              },
              {
                start: "0",
                end: "3",
                weight: "20",
              },
              {
                start: "3",
                end: "2",
                weight: "30",
              },
              {
                start: "1",
                end: "3",
                weight: "25",
              },
            ],
            nodes: {
              0: {
                x: 409.16668701171875,
                y: 67.06666564941406,
                label: 0,
                color: "Default",
              },
              1: {
                x: 214.16668701171875,
                y: 328.06666564941406,
                label: 1,
                color: "Default",
              },
              2: {
                x: 646.1666870117188,
                y: 368.0500030517578,
                label: 2,
                color: "Default",
              },
              3: {
                x: 414.16668701171875,
                y: 236.86666870117188,
                label: 3,
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: false,
              type: "switch",
            },
            weightedEdge: {
              value: true,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: false,
              type: "switch",
            },
            deleteNode: {
              value: false,
              type: "switch",
            },
            dragNode: {
              value: false,
              type: "switch",
            },
            addEdge: {
              value: false,
              type: "switch",
            },
            deleteEdge: {
              value: false,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: { value: false, type: "switch" },
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({
            edges: [
              {
                start: "1",
                end: "0",
                weight: "10",
              },
              {
                start: "0",
                end: "2",
                weight: "15",
              },
              {
                start: "1",
                end: "2",
                weight: "35",
              },
              {
                start: "0",
                end: "3",
                weight: "20",
              },
              {
                start: "3",
                end: "2",
                weight: "30",
              },
              {
                start: "1",
                end: "3",
                weight: "25",
              },
            ],
            nodes: {
              0: {
                x: 409.16668701171875,
                y: 67.06666564941406,
                label: 0,
                color: "Default",
              },
              1: {
                x: 214.16668701171875,
                y: 328.06666564941406,
                label: 1,
                color: "Default",
              },
              2: {
                x: 646.1666870117188,
                y: 368.0500030517578,
                label: 2,
                color: "Default",
              },
              3: {
                x: 414.16668701171875,
                y: 236.86666870117188,
                label: 3,
                color: "Default",
              },
            },
            selectedEdges: [
              {
                start: "0",
                end: "2",
                weight: "15",
              },
              {
                start: "1",
                end: "0",
                weight: "10",
              },
              {
                start: "1",
                end: "3",
                weight: "25",
              },
              {
                start: "3",
                end: "2",
                weight: "30",
              },
            ],
            selectedNodes: [],
          }),
        },
        {
          // id: 15,
          setterId: 2,
          canvasId: 1,
          title: "Red Black",
          statement: "Delete 5.",
          canvasData: JSON.stringify({
            edges: [
              {
                start: "1",
                end: "3",
                weight: "0",
              },
              {
                start: "1",
                end: "4",
                weight: "0",
              },
              {
                start: "1",
                end: "0",
                weight: "0",
              },
              {
                start: "0",
                end: "2",
                weight: "0",
              },
              {
                start: "2",
                end: "5",
                weight: "0",
              },
              {
                start: "2",
                end: "6",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 451.16668701171875,
                y: 54.46665954589844,
                label: 0,
                color: "Black",
              },
              1: {
                x: 327.16668701171875,
                y: 183.46665954589844,
                label: 1,
                color: "Red",
              },
              2: {
                x: 561.1666870117188,
                y: 183.46665954589844,
                label: 2,
                color: "Red",
              },
              3: {
                x: 159.16668701171875,
                y: 235.46665954589844,
                label: 3,
                color: "Black",
              },
              4: {
                x: 366.16668701171875,
                y: 337.46665954589844,
                label: 4,
                color: "Black",
              },
              5: {
                x: 533.1666870117188,
                y: 336.46665954589844,
                label: 5,
                color: "Black",
              },
              6: {
                x: 739.1666870117188,
                y: 234.46665954589844,
                label: 6,
                color: "Black",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: false,
              type: "switch",
            },
            weightedEdge: {
              value: false,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: false,
              type: "switch",
            },
            deleteNode: {
              value: false,
              type: "switch",
            },
            dragNode: {
              value: true,
              type: "switch",
            },
            addEdge: {
              value: false,
              type: "switch",
            },
            deleteEdge: {
              value: true,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: { value: false, type: "switch" },
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({
            edges: [],
            nodes: {},
            selectedEdges: [],
            selectedNodes: [],
          }),
        },
        {
          // id: 16,
          setterId: 2,
          canvasId: 1,
          title: "Police Check Posts",
          statement:
            "The government plans to establish police check post with sophisticated equipment in road crossings of a city in such a way that every road has a check post. In a graph model of the city, where each vertex represents a road crossings and each edge represents a road, a vertex cover gives a feasible solution for the locations of police check posts. If the government wishes to minimize the number of police check posts for budget constraint, a vertex cover having the minimum number of vertices gives a feasible solution. A vertex cover of a graph G is a minimum vertex cover if it contains the minimum number of vertices among all vertex covers of G. **In the given graph model of the city, select the minimum number of checkposts to cover the whole city.**",
          canvasData: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "1",
                weight: "0",
              },
              {
                start: "1",
                end: "3",
                weight: "0",
              },
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "1",
                end: "2",
                weight: "0",
              },
              {
                start: "3",
                end: "2",
                weight: "0",
              },
              {
                start: "2",
                end: "4",
                weight: "0",
              },
              {
                start: "4",
                end: "6",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "6",
                weight: "0",
              },
              {
                start: "5",
                end: "7",
                weight: "0",
              },
              {
                start: "7",
                end: "8",
                weight: "0",
              },
              {
                start: "7",
                end: "6",
                weight: "0",
              },
              {
                start: "8",
                end: "6",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 104.79998779296875,
                y: 230,
                label: "a",
                color: "Default",
              },
              1: {
                x: 193.79998779296875,
                y: 110,
                label: "b",
                color: "Default",
              },
              2: {
                x: 386.79998779296875,
                y: 180,
                label: "c",
                color: "Default",
              },
              3: {
                x: 261.79998779296875,
                y: 301,
                label: "d",
                color: "Default",
              },
              4: {
                x: 552.7999877929688,
                y: 118.19999694824219,
                label: "e",
                color: "Default",
              },
              5: {
                x: 514.7999877929688,
                y: 266.1999969482422,
                label: "g",
                color: "Default",
              },
              6: {
                x: 762.7999877929688,
                y: 138.1999969482422,
                label: "f",
                color: "Default",
              },
              7: {
                x: 663.7999877929688,
                y: 334.1999969482422,
                label: "h",
                color: "Default",
              },
              8: {
                x: 809.7999877929688,
                y: 285.1999969482422,
                label: "i",
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: false,
              type: "switch",
            },
            weightedEdge: {
              value: false,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: false,
              type: "switch",
            },
            deleteNode: {
              value: false,
              type: "switch",
            },
            dragNode: {
              value: false,
              type: "switch",
            },
            addEdge: {
              value: false,
              type: "switch",
            },
            deleteEdge: {
              value: false,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: { value: false, type: "switch" },
          }),
          checkerCode: `/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction isVertexCover(edges, selectedNodes) {\n  // Convert selectedNodes to a Set for faster lookup\n  const selectedNodesSet = new Set(selectedNodes);\n\n  // Iterate over all edges in the graph\n  for (let edge of edges) {\n    // Check if neither vertex of the edge is in selectedNodes\n    if (!selectedNodesSet.has(edge.start) && !selectedNodesSet.has(edge.end)) {\n      // If neither vertex is in selectedNodes, then selectedNodes is not a vertex cover\n      return false;\n    }\n  }\n\n  // If we've checked all edges and haven't returned false, then selectedNodes is a vertex cover\n  return true;\n}\n\nfunction solutionChecker(userCanvas, solutionCanvas, userActivity) {\n  if (solutionCanvas.selectedNodes.length === userCanvas.selectedNodes.length)\n  {\n    return isVertexCover(userCanvas.edges, userCanvas.selectedNodes);\n  }\n  return false;\n}\n`,
          checkerCanvas: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "1",
                weight: "0",
              },
              {
                start: "1",
                end: "3",
                weight: "0",
              },
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "1",
                end: "2",
                weight: "0",
              },
              {
                start: "3",
                end: "2",
                weight: "0",
              },
              {
                start: "2",
                end: "4",
                weight: "0",
              },
              {
                start: "4",
                end: "6",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "6",
                weight: "0",
              },
              {
                start: "5",
                end: "7",
                weight: "0",
              },
              {
                start: "7",
                end: "8",
                weight: "0",
              },
              {
                start: "7",
                end: "6",
                weight: "0",
              },
              {
                start: "8",
                end: "6",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 104.79998779296875,
                y: 230,
                label: "a",
                color: "Default",
              },
              1: {
                x: 193.79998779296875,
                y: 110,
                label: "b",
                color: "Default",
              },
              2: {
                x: 386.79998779296875,
                y: 180,
                label: "c",
                color: "Default",
              },
              3: {
                x: 261.79998779296875,
                y: 301,
                label: "d",
                color: "Default",
              },
              4: {
                x: 552.7999877929688,
                y: 118.19999694824219,
                label: "e",
                color: "Default",
              },
              5: {
                x: 514.7999877929688,
                y: 266.1999969482422,
                label: "g",
                color: "Default",
              },
              6: {
                x: 762.7999877929688,
                y: 138.1999969482422,
                label: "f",
                color: "Default",
              },
              7: {
                x: 663.7999877929688,
                y: 334.1999969482422,
                label: "h",
                color: "Default",
              },
              8: {
                x: 809.7999877929688,
                y: 285.1999969482422,
                label: "i",
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: ["1", "3", "4", "6", "7"],
          }),
        },
        {
          // id: 17,
          setterId: 2,
          canvasId: 1,
          title: "Independent Set",
          statement: "Find the maximum independent set of the given graph.",
          canvasData: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "1",
                weight: "0",
              },
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "0",
                end: "2",
                weight: "0",
              },
              {
                start: "1",
                end: "4",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "6",
                weight: "0",
              },
              {
                start: "3",
                end: "6",
                weight: "0",
              },
              {
                start: "2",
                end: "4",
                weight: "0",
              },
              {
                start: "2",
                end: "6",
                weight: "0",
              },
              {
                start: "6",
                end: "7",
                weight: "0",
              },
              {
                start: "4",
                end: "7",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 100.79998779296875,
                y: 220.39999389648438,
                label: 0,
                color: "Default",
              },
              1: {
                x: 279.79998779296875,
                y: 84.39999389648438,
                label: 1,
                color: "Default",
              },
              2: {
                x: 338.79998779296875,
                y: 246.39999389648438,
                label: 2,
                color: "Default",
              },
              3: {
                x: 280.79998779296875,
                y: 368.3999938964844,
                label: 3,
                color: "Default",
              },
              4: {
                x: 546.7999877929688,
                y: 78.39999389648438,
                label: 4,
                color: "Default",
              },
              5: {
                x: 510.79998779296875,
                y: 212.39999389648438,
                label: 5,
                color: "Default",
              },
              6: {
                x: 665.7999877929688,
                y: 368.3999938964844,
                label: 6,
                color: "Default",
              },
              7: {
                x: 762.7999877929688,
                y: 177.39999389648438,
                label: 7,
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: false,
              type: "switch",
            },
            weightedEdge: {
              value: false,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: false,
              type: "switch",
            },
            deleteNode: {
              value: false,
              type: "switch",
            },
            dragNode: {
              value: false,
              type: "switch",
            },
            addEdge: {
              value: false,
              type: "switch",
            },
            deleteEdge: {
              value: false,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: { value: false, type: "switch" },
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction isIndependentSet(edges, selectedNodes) {\n  // Convert selectedNodes to a Set for faster lookup\n  const selectedNodesSet = new Set(selectedNodes);\n\n  // Iterate over all edges in the graph\n  for (let edge of edges) {\n    // Check if both vertices of the edge are in selectedNodes\n    if (selectedNodesSet.has(edge.start) && selectedNodesSet.has(edge.end)) {\n      // If both vertices are in selectedNodes, then selectedNodes is not an independent set\n      return false;\n    }\n  }\n\n  // If we've checked all edges and haven't returned false, then selectedNodes is a vertex cover\n  return true;\n}\n\nfunction solutionChecker(userCanvas, solutionCanvas, userActivity) {\n  if (userCanvas.selectedNodes.length === solutionCanvas.selectedNodes.length) {\n    return isIndependentSet(userCanvas.edges, userCanvas.selectedNodes);\n  }\n  return false;\n}\n",
          checkerCanvas: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "1",
                weight: "0",
              },
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "0",
                end: "2",
                weight: "0",
              },
              {
                start: "1",
                end: "4",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "6",
                weight: "0",
              },
              {
                start: "3",
                end: "6",
                weight: "0",
              },
              {
                start: "2",
                end: "4",
                weight: "0",
              },
              {
                start: "2",
                end: "6",
                weight: "0",
              },
              {
                start: "6",
                end: "7",
                weight: "0",
              },
              {
                start: "4",
                end: "7",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 100.79998779296875,
                y: 220.39999389648438,
                label: 0,
                color: "Default",
              },
              1: {
                x: 279.79998779296875,
                y: 84.39999389648438,
                label: 1,
                color: "Default",
              },
              2: {
                x: 338.79998779296875,
                y: 246.39999389648438,
                label: 2,
                color: "Default",
              },
              3: {
                x: 280.79998779296875,
                y: 368.3999938964844,
                label: 3,
                color: "Default",
              },
              4: {
                x: 546.7999877929688,
                y: 78.39999389648438,
                label: 4,
                color: "Default",
              },
              5: {
                x: 510.79998779296875,
                y: 212.39999389648438,
                label: 5,
                color: "Default",
              },
              6: {
                x: 665.7999877929688,
                y: 368.3999938964844,
                label: 6,
                color: "Default",
              },
              7: {
                x: 762.7999877929688,
                y: 177.39999389648438,
                label: 7,
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: ["1", "2", "3", "5", "7"],
          }),
        },
        {
          // id: 18,
          setterId: 2,
          canvasId: 1,
          title: "Fire Stations",
          statement:
            "The government plans to establish fire stations in a new city in such a way that a locality or one of its neighbor localities will have a fire station. In a graph model of the city, where each vertex represents a locality and each edge represents the neighborhood of two localities, a dominating set gives a feasible solution for the locations of fire stations. If the government wishes to minimize the number of fire stations for budget constraint, a minimum dominating set gives a feasible solution. Find the minimum dominating set of the given graph.",
          canvasData: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "1",
                weight: "0",
              },
              {
                start: "1",
                end: "3",
                weight: "0",
              },
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "1",
                end: "2",
                weight: "0",
              },
              {
                start: "3",
                end: "2",
                weight: "0",
              },
              {
                start: "2",
                end: "4",
                weight: "0",
              },
              {
                start: "4",
                end: "6",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "6",
                weight: "0",
              },
              {
                start: "5",
                end: "7",
                weight: "0",
              },
              {
                start: "7",
                end: "8",
                weight: "0",
              },
              {
                start: "7",
                end: "6",
                weight: "0",
              },
              {
                start: "8",
                end: "6",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 104.79998779296875,
                y: 230,
                label: "a",
                color: "Default",
              },
              1: {
                x: 193.79998779296875,
                y: 110,
                label: "b",
                color: "Default",
              },
              2: {
                x: 386.79998779296875,
                y: 180,
                label: "c",
                color: "Default",
              },
              3: {
                x: 261.79998779296875,
                y: 301,
                label: "d",
                color: "Default",
              },
              4: {
                x: 552.7999877929688,
                y: 118.19999694824219,
                label: "e",
                color: "Default",
              },
              5: {
                x: 514.7999877929688,
                y: 266.1999969482422,
                label: "g",
                color: "Default",
              },
              6: {
                x: 762.7999877929688,
                y: 138.1999969482422,
                label: "f",
                color: "Default",
              },
              7: {
                x: 663.7999877929688,
                y: 334.1999969482422,
                label: "h",
                color: "Default",
              },
              8: {
                x: 809.7999877929688,
                y: 285.1999969482422,
                label: "i",
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: false,
              type: "switch",
            },
            weightedEdge: {
              value: false,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: false,
              type: "switch",
            },
            deleteNode: {
              value: false,
              type: "switch",
            },
            dragNode: {
              value: false,
              type: "switch",
            },
            addEdge: {
              value: false,
              type: "switch",
            },
            deleteEdge: {
              value: false,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: { value: false, type: "switch" },
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction createGraph(edges) {\n  const graph = new Map();\n  for (const edge of edges) {\n    const { start, end, weight } = edge;\n\n    if (!graph.has(start)) {\n      graph.set(start, []);\n    }\n\n    if (!graph.has(end)) {\n      graph.set(end, []);\n    }\n\n    graph.get(start).push({ value: end, weight: parseInt(weight) });\n    graph.get(end).push({ value: start, weight: parseInt(weight) });\n  }\n  return graph;\n}\n\nfunction isDominatingSet(graph, selectedNodes) {\n    // Convert selectedNodes to a Set for faster lookup\n  const selectedNodesSet = new Set(selectedNodes);\n\n  // Create a set to store the dominated nodes\n  const dominatedNodes = new Set(selectedNodes);\n\n  // Iterate over all nodes in the graph\n  for (let node of graph.keys()) {\n    // If the node is in selectedNodes, it's already dominated\n    if (selectedNodesSet.has(node)) continue;\n\n    // Check if the node is adjacent to a node in selectedNodes\n    for (let adjacentNode of graph.get(node)) {\n      if (selectedNodesSet.has(adjacentNode.value)) {\n        dominatedNodes.add(node);\n        break;\n      }\n    }\n  }\n\n  // If the number of dominated nodes is equal to the number of nodes in the graph,\n  // then selectedNodes is a dominating set\n  return dominatedNodes.size === graph.size;\n}\n\nfunction solutionChecker(userCanvas, solutionCanvas, userActivity) {\n  if (solutionCanvas.selectedNodes.length === userCanvas.selectedNodes.length)\n  {\n    return isDominatingSet(createGraph(userCanvas.edges), userCanvas.selectedNodes);\n  }\n  return false;\n}\n",
          checkerCanvas: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "1",
                weight: "0",
              },
              {
                start: "1",
                end: "3",
                weight: "0",
              },
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "1",
                end: "2",
                weight: "0",
              },
              {
                start: "3",
                end: "2",
                weight: "0",
              },
              {
                start: "2",
                end: "4",
                weight: "0",
              },
              {
                start: "4",
                end: "6",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "6",
                weight: "0",
              },
              {
                start: "5",
                end: "7",
                weight: "0",
              },
              {
                start: "7",
                end: "8",
                weight: "0",
              },
              {
                start: "7",
                end: "6",
                weight: "0",
              },
              {
                start: "8",
                end: "6",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 104.79998779296875,
                y: 230,
                label: "a",
                color: "Default",
              },
              1: {
                x: 193.79998779296875,
                y: 110,
                label: "b",
                color: "Default",
              },
              2: {
                x: 386.79998779296875,
                y: 180,
                label: "c",
                color: "Default",
              },
              3: {
                x: 261.79998779296875,
                y: 301,
                label: "d",
                color: "Default",
              },
              4: {
                x: 552.7999877929688,
                y: 118.19999694824219,
                label: "e",
                color: "Default",
              },
              5: {
                x: 514.7999877929688,
                y: 266.1999969482422,
                label: "g",
                color: "Default",
              },
              6: {
                x: 762.7999877929688,
                y: 138.1999969482422,
                label: "f",
                color: "Default",
              },
              7: {
                x: 663.7999877929688,
                y: 334.1999969482422,
                label: "h",
                color: "Default",
              },
              8: {
                x: 809.7999877929688,
                y: 285.1999969482422,
                label: "i",
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: ["1", "6"],
          }),
        },
        {
          // id: 19,
          setterId: 2,
          canvasId: 1,
          title: "Factor",
          statement: "Find 1-factor of the given graph.",
          canvasData: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "3",
                end: "2",
                weight: "0",
              },
              {
                start: "2",
                end: "1",
                weight: "0",
              },
              {
                start: "1",
                end: "0",
                weight: "0",
              },
              {
                start: "0",
                end: "2",
                weight: "0",
              },
              {
                start: "3",
                end: "1",
                weight: "0",
              },
              {
                start: "4",
                end: "2",
                weight: "0",
              },
              {
                start: "3",
                end: "4",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "6",
                weight: "0",
              },
              {
                start: "6",
                end: "9",
                weight: "0",
              },
              {
                start: "5",
                end: "7",
                weight: "0",
              },
              {
                start: "7",
                end: "8",
                weight: "0",
              },
              {
                start: "8",
                end: "9",
                weight: "0",
              },
              {
                start: "7",
                end: "9",
                weight: "0",
              },
              {
                start: "6",
                end: "8",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 71.79998779296875,
                y: 112.19999694824219,
                label: 0,
                color: "Default",
              },
              1: {
                x: 71.79998779296875,
                y: 304.1999969482422,
                label: 1,
                color: "Default",
              },
              2: {
                x: 266.79998779296875,
                y: 305.1999969482422,
                label: 2,
                color: "Default",
              },
              3: {
                x: 257.79998779296875,
                y: 106.19999694824219,
                label: 3,
                color: "Default",
              },
              4: {
                x: 370.79998779296875,
                y: 216.1999969482422,
                label: 4,
                color: "Default",
              },
              5: {
                x: 525.7999877929688,
                y: 216.1999969482422,
                label: 5,
                color: "Default",
              },
              6: {
                x: 619.7999877929688,
                y: 120.19999694824219,
                label: 6,
                color: "Default",
              },
              7: {
                x: 616.7999877929688,
                y: 309.1999969482422,
                label: 7,
                color: "Default",
              },
              8: {
                x: 803.7999877929688,
                y: 311.1999969482422,
                label: 8,
                color: "Default",
              },
              9: {
                x: 799.7999877929688,
                y: 118.19999694824219,
                label: 9,
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: false,
              type: "switch",
            },
            weightedEdge: {
              value: false,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: false,
              type: "switch",
            },
            deleteNode: {
              value: false,
              type: "switch",
            },
            dragNode: {
              value: false,
              type: "switch",
            },
            addEdge: {
              value: false,
              type: "switch",
            },
            deleteEdge: {
              value: false,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: { value: false, type: "switch" },
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({
            edges: [
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "3",
                end: "2",
                weight: "0",
              },
              {
                start: "2",
                end: "1",
                weight: "0",
              },
              {
                start: "1",
                end: "0",
                weight: "0",
              },
              {
                start: "0",
                end: "2",
                weight: "0",
              },
              {
                start: "3",
                end: "1",
                weight: "0",
              },
              {
                start: "4",
                end: "2",
                weight: "0",
              },
              {
                start: "3",
                end: "4",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "6",
                weight: "0",
              },
              {
                start: "6",
                end: "9",
                weight: "0",
              },
              {
                start: "5",
                end: "7",
                weight: "0",
              },
              {
                start: "7",
                end: "8",
                weight: "0",
              },
              {
                start: "8",
                end: "9",
                weight: "0",
              },
              {
                start: "7",
                end: "9",
                weight: "0",
              },
              {
                start: "6",
                end: "8",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 71.79998779296875,
                y: 112.19999694824219,
                label: 0,
                color: "Default",
              },
              1: {
                x: 71.79998779296875,
                y: 304.1999969482422,
                label: 1,
                color: "Default",
              },
              2: {
                x: 266.79998779296875,
                y: 305.1999969482422,
                label: 2,
                color: "Default",
              },
              3: {
                x: 257.79998779296875,
                y: 106.19999694824219,
                label: 3,
                color: "Default",
              },
              4: {
                x: 370.79998779296875,
                y: 216.1999969482422,
                label: 4,
                color: "Default",
              },
              5: {
                x: 525.7999877929688,
                y: 216.1999969482422,
                label: 5,
                color: "Default",
              },
              6: {
                x: 619.7999877929688,
                y: 120.19999694824219,
                label: 6,
                color: "Default",
              },
              7: {
                x: 616.7999877929688,
                y: 309.1999969482422,
                label: 7,
                color: "Default",
              },
              8: {
                x: 803.7999877929688,
                y: 311.1999969482422,
                label: 8,
                color: "Default",
              },
              9: {
                x: 799.7999877929688,
                y: 118.19999694824219,
                label: 9,
                color: "Default",
              },
            },
            selectedEdges: [
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "2",
                end: "1",
                weight: "0",
              },
              {
                start: "4",
                end: "5",
                weight: "0",
              },
              {
                start: "6",
                end: "9",
                weight: "0",
              },
              {
                start: "7",
                end: "8",
                weight: "0",
              },
            ],
            selectedNodes: [],
          }),
        },
        {
          // id: 20,
          setterId: 2,
          canvasId: 1,
          title: "Peterson Dominating",
          statement: "Find minimum dominating set.",
          canvasData: JSON.stringify({
            edges: [
              {
                start: "8",
                end: "6",
                weight: "0",
              },
              {
                start: "6",
                end: "9",
                weight: "0",
              },
              {
                start: "9",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "7",
                weight: "0",
              },
              {
                start: "7",
                end: "8",
                weight: "0",
              },
              {
                start: "8",
                end: "3",
                weight: "0",
              },
              {
                start: "9",
                end: "4",
                weight: "0",
              },
              {
                start: "7",
                end: "2",
                weight: "0",
              },
              {
                start: "1",
                end: "6",
                weight: "0",
              },
              {
                start: "0",
                end: "5",
                weight: "0",
              },
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "4",
                end: "2",
                weight: "0",
              },
              {
                start: "4",
                end: "3",
                weight: "0",
              },
              {
                start: "0",
                end: "1",
                weight: "0",
              },
              {
                start: "1",
                end: "2",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 198.79998779296875,
                y: 232,
                label: "B",
                color: "Default",
              },
              1: {
                x: 444.79998779296875,
                y: 39,
                label: "A",
                color: "Default",
              },
              2: {
                x: 683.7999877929688,
                y: 233,
                label: "E",
                color: "Default",
              },
              3: {
                x: 310.79998779296875,
                y: 431,
                label: "C",
                color: "Default",
              },
              4: {
                x: 590.7999877929688,
                y: 428,
                label: "D",
                color: "Default",
              },
              5: {
                x: 311.79998779296875,
                y: 235,
                label: "G",
                color: "Default",
              },
              6: {
                x: 446.79998779296875,
                y: 142,
                label: "F",
                color: "Default",
              },
              7: {
                x: 579.7999877929688,
                y: 235,
                label: "J",
                color: "Default",
              },
              8: {
                x: 362.79998779296875,
                y: 344,
                label: "H",
                color: "Default",
              },
              9: {
                x: 539.7999877929688,
                y: 345,
                label: "I",
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: false,
              type: "switch",
            },
            weightedEdge: {
              value: false,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: false,
              type: "switch",
            },
            deleteNode: {
              value: false,
              type: "switch",
            },
            dragNode: {
              value: false,
              type: "switch",
            },
            addEdge: {
              value: false,
              type: "switch",
            },
            deleteEdge: {
              value: false,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: { value: false, type: "switch" },
          }),
          checkerCode:
            "/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\n\r\nfunction createGraph(edges) {\r\n  const graph = new Map();\r\n  for (const edge of edges) {\r\n    const { start, end, weight } = edge;\r\n\r\n    if (!graph.has(start)) {\r\n      graph.set(start, []);\r\n    }\r\n\r\n    if (!graph.has(end)) {\r\n      graph.set(end, []);\r\n    }\r\n\r\n    graph.get(start).push({ value: end, weight: parseInt(weight) });\r\n    graph.get(end).push({ value: start, weight: parseInt(weight) });\r\n  }\r\n  return graph;\r\n}\r\n\r\nfunction isDominatingSet(graph, selectedNodes) {\r\n    // Convert selectedNodes to a Set for faster lookup\r\n  const selectedNodesSet = new Set(selectedNodes);\r\n\r\n  // Create a set to store the dominated nodes\r\n  const dominatedNodes = new Set(selectedNodes);\r\n\r\n  // Iterate over all nodes in the graph\r\n  for (let node of graph.keys()) {\r\n    // If the node is in selectedNodes, it's already dominated\r\n    if (selectedNodesSet.has(node)) continue;\r\n\r\n    // Check if the node is adjacent to a node in selectedNodes\r\n    for (let adjacentNode of graph.get(node)) {\r\n      if (selectedNodesSet.has(adjacentNode.value)) {\r\n        dominatedNodes.add(node);\r\n        break;\r\n      }\r\n    }\r\n  }\r\n\r\n  // If the number of dominated nodes is equal to the number of nodes in the graph,\r\n  // then selectedNodes is a dominating set\r\n  return dominatedNodes.size === graph.size;\r\n}\r\n\r\nfunction solutionChecker(userCanvas, solutionCanvas, userActivity) {\r\n  if (solutionCanvas.selectedNodes.length === userCanvas.selectedNodes.length)\r\n  {\r\n    return isDominatingSet(createGraph(userCanvas.edges), userCanvas.selectedNodes);\r\n  }\r\n  return false;\r\n}\r\n",
          checkerCanvas: JSON.stringify({
            edges: [
              {
                start: "8",
                end: "6",
                weight: "0",
              },
              {
                start: "6",
                end: "9",
                weight: "0",
              },
              {
                start: "9",
                end: "5",
                weight: "0",
              },
              {
                start: "5",
                end: "7",
                weight: "0",
              },
              {
                start: "7",
                end: "8",
                weight: "0",
              },
              {
                start: "8",
                end: "3",
                weight: "0",
              },
              {
                start: "9",
                end: "4",
                weight: "0",
              },
              {
                start: "7",
                end: "2",
                weight: "0",
              },
              {
                start: "1",
                end: "6",
                weight: "0",
              },
              {
                start: "0",
                end: "5",
                weight: "0",
              },
              {
                start: "0",
                end: "3",
                weight: "0",
              },
              {
                start: "4",
                end: "2",
                weight: "0",
              },
              {
                start: "4",
                end: "3",
                weight: "0",
              },
              {
                start: "0",
                end: "1",
                weight: "0",
              },
              {
                start: "1",
                end: "2",
                weight: "0",
              },
            ],
            nodes: {
              0: {
                x: 198.79998779296875,
                y: 232,
                label: "B",
                color: "Default",
              },
              1: {
                x: 444.79998779296875,
                y: 39,
                label: "A",
                color: "Default",
              },
              2: {
                x: 683.7999877929688,
                y: 233,
                label: "E",
                color: "Default",
              },
              3: {
                x: 310.79998779296875,
                y: 431,
                label: "C",
                color: "Default",
              },
              4: {
                x: 590.7999877929688,
                y: 428,
                label: "D",
                color: "Default",
              },
              5: {
                x: 311.79998779296875,
                y: 235,
                label: "G",
                color: "Default",
              },
              6: {
                x: 446.79998779296875,
                y: 142,
                label: "F",
                color: "Default",
              },
              7: {
                x: 579.7999877929688,
                y: 235,
                label: "J",
                color: "Default",
              },
              8: {
                x: 362.79998779296875,
                y: 344,
                label: "H",
                color: "Default",
              },
              9: {
                x: 539.7999877929688,
                y: 345,
                label: "I",
                color: "Default",
              },
            },
            selectedEdges: [],
            selectedNodes: ["0", "2", "6"],
          }),
        },
        {
          // id: 21,
          setterId: 2,
          canvasId: 3,
          title: "Drag Sort",
          statement: "Sort the array in ascending order by simply dragging.",
          canvasData: JSON.stringify({
            selectedElements: [],
            array: [
              [
                {
                  label: "5",
                  selected: false,
                  key: 5,
                },
                {
                  label: "0",
                  selected: false,
                  key: 0,
                },
                {
                  label: "9",
                  selected: false,
                  key: 9,
                },
                {
                  label: "8",
                  selected: false,
                  key: 8,
                },
                {
                  label: "3",
                  selected: false,
                  key: 3,
                },
                {
                  label: "6",
                  selected: false,
                  key: 6,
                },
                {
                  label: "1",
                  selected: false,
                  key: 1,
                },
                {
                  label: "2",
                  selected: false,
                  key: 2,
                },
                {
                  label: "7",
                  selected: false,
                  key: 7,
                },
                {
                  label: "4",
                  selected: false,
                  key: 4,
                },
              ],
            ],
          }),
          editOptions: JSON.stringify({
            dataType: {
              value: "Integer",
              type: "select",
              list: ["Integer", "Character"],
            },
          }),
          previewOptions: JSON.stringify({
            drag: {
              value: true,
              type: "switch",
            },
            swap: {
              value: 0,
              type: "number",
            },
            rotate: {
              value: 0,
              type: "number",
            },
            reverse: {
              value: 0,
              type: "number",
            },
            sort: {
              value: 0,
              type: "number",
            },
            editLabel: {
              value: false,
              type: "switch",
            },
          }),
          checkerCode:
            "function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}",
          checkerCanvas: JSON.stringify({
            selectedElements: [],
            array: [
              [
                {
                  label: "0",
                  selected: false,
                  key: 0,
                },
                {
                  label: "1",
                  selected: false,
                  key: 1,
                },
                {
                  label: "2",
                  selected: false,
                  key: 2,
                },
                {
                  label: "3",
                  selected: false,
                  key: 3,
                },
                {
                  label: "4",
                  selected: false,
                  key: 4,
                },
                {
                  label: "5",
                  selected: false,
                  key: 5,
                },
                {
                  label: "6",
                  selected: false,
                  key: 6,
                },
                {
                  label: "7",
                  selected: false,
                  key: 7,
                },
                {
                  label: "8",
                  selected: false,
                  key: 8,
                },
                {
                  label: "9",
                  selected: false,
                  key: 9,
                },
              ],
            ],
          }),
        },
        {
          // id: 22,
          setterId: 2,
          canvasId: 1,
          title: "BST",
          statement:
            "Draw the Binary Search Tree of the array **[5,4,2,6,1,10]**.",
          canvasData: JSON.stringify({
            edges: [],
            nodes: {},
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: true,
              type: "switch",
            },
            weightedEdge: {
              value: false,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: true,
              type: "switch",
            },
            deleteNode: {
              value: true,
              type: "switch",
            },
            dragNode: {
              value: true,
              type: "switch",
            },
            addEdge: {
              value: true,
              type: "switch",
            },
            deleteEdge: {
              value: true,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: {
              value: true,
              type: "switch",
            },
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({
            edges: [],
            nodes: {},
            selectedEdges: [],
            selectedNodes: [],
          }),
        },
        {
          // id: 23
          setterId: 2,
          canvasId: 1,
          title: "Maximal Planar Graph",
          statement: "Draw the maximal planar graph of 5 vertices.",
          canvasData: JSON.stringify({
            edges: [],
            nodes: {},
            selectedEdges: [],
            selectedNodes: [],
          }),
          editOptions: JSON.stringify({
            directedEdge: {
              value: false,
              type: "switch",
            },
            weightedEdge: {
              value: false,
              type: "switch",
            },
          }),
          previewOptions: JSON.stringify({
            addNode: {
              value: false,
              type: "switch",
            },
            deleteNode: {
              value: false,
              type: "switch",
            },
            dragNode: {
              value: true,
              type: "switch",
            },
            addEdge: {
              value: false,
              type: "switch",
            },
            deleteEdge: {
              value: false,
              type: "switch",
            },
            editWeight: {
              value: false,
              type: "switch",
            },
            editColor: {
              value: false,
              type: "switch",
            },
            editLabel: {
              value: false,
              type: "switch",
            },
          }),
          checkerCode:
            "/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({
            edges: [],
            nodes: {},
            selectedEdges: [],
            selectedNodes: [],
          }),
        },
        {
          // id: 24
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 1",
          statement: "Demo Statement 1",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 25
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 2",
          statement: "Demo Statement 2",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 26
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 3",
          statement: "Demo Statement 3",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 27
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 4",
          statement: "Demo Statement 4",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 28
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 5",
          statement: "Demo Statement 5",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 29
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 6",
          statement: "Demo Statement 6",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 30
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 7",
          statement: "Demo Statement 7",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 31
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 8",
          statement: "Demo Statement 8",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 32
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 9",
          statement: "Demo Statement 9",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 33
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 10",
          statement: "Demo Statement 10",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 34
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 11",
          statement: "Demo Statement 11",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 35
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 12",
          statement: "Demo Statement 12",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 36
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 13",
          statement: "Demo Statement 13",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 37
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 14",
          statement: "Demo Statement 14",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 38
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 15",
          statement: "Demo Statement 15",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 39
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 16",
          statement: "Demo Statement 16",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 40
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 17",
          statement: "Demo Statement 17",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 41
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 18",
          statement: "Demo Statement 18",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 42
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 19",
          statement: "Demo Statement 19",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 43
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 20",
          statement: "Demo Statement 20",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 44
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 21",
          statement: "Demo Statement 21",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 45
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 22",
          statement: "Demo Statement 22",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 46
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 23",
          statement: "Demo Statement 23",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 47
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 24",
          statement: "Demo Statement 24",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 48
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 25",
          statement: "Demo Statement 25",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 49
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 26",
          statement: "Demo Statement 26",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 50
          setterId: 2,
          canvasId: 3,
          title: "Demo Problem 27",
          statement: "Demo Statement 27",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 51
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 28",
          statement: "Demo Statement 28",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 52
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 29",
          statement: "Demo Statement 29",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 53
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 30",
          statement: "Demo Statement 30",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 54
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 31",
          statement: "Demo Statement 31",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 55
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 32",
          statement: "Demo Statement 32",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 56
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 33",
          statement: "Demo Statement 33",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 57
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 34",
          statement: "Demo Statement 34",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 58
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 35",
          statement: "Demo Statement 35",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 59
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 36",
          statement: "Demo Statement 36",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 60
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 37",
          statement: "Demo Statement 37",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 61
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 38",
          statement: "Demo Statement 38",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 62
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 39",
          statement: "Demo Statement 39",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 63
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 40",
          statement: "Demo Statement 40",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 64
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 41",
          statement: "Demo Statement 41",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 65
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 42",
          statement: "Demo Statement 42",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 66
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 43",
          statement: "Demo Statement 43",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 67
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 44",
          statement: "Demo Statement 44",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
        {
          // id: 68
          setterId: 2,
          canvasId: 1,
          title: "Demo Problem 45",
          statement: "Demo Statement 45",
          canvasData: JSON.stringify({}),
          editOptions: JSON.stringify({}),
          previewOptions: JSON.stringify({}),
          checkerCode:
            "/*function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n",
          checkerCanvas: JSON.stringify({}),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Problems", null, {});
  },
};
