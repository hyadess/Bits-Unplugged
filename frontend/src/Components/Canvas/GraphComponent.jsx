import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Stage,
  Layer,
  Circle,
  Line,
  Text,
  Group,
  Rect,
  Shape,
} from "react-konva";
import "./GraphComponent.scss";
const RADIUS = 30;
const EDGECLICKRANGE = 20;
const canvasWidth = 1440;
const canvasHeight = 1080;

const GraphComponent = (props, ref) => {
  const [edgeIndex, setEdgeIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [ctrlKeyPressed, setCtrlKeyPressed] = useState(false);
  const [zoom, setZoom] = useState(1);
  const stageRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      handleReset: () => {
        importGraphData();
      },
      getData: () => exportGraphData(),
    };
  });
  // Function to calculate the distance from a point to a line segment...used to select an edge!!!!
  const pointToLineDistance = (px, py, x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dot = dx * (px - x1) + dy * (py - y1);
    const lenSq = dx * dx + dy * dy;
    const param = lenSq !== 0 ? dot / lenSq : -1;

    let closestX, closestY;
    if (param < 0) {
      closestX = x1;
      closestY = y1;
    } else if (param > 1) {
      closestX = x2;
      closestY = y2;
    } else {
      closestX = x1 + param * dx;
      closestY = y1 + param * dy;
    }

    const dxClosest = px - closestX;
    const dyClosest = py - closestY;
    return Math.sqrt(dxClosest * dxClosest + dyClosest * dyClosest);
  };

  //keyboard input..........................
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Control") {
        setCtrlKeyPressed(true);
      } else if (ctrlKeyPressed && event.key === "x") {
        deleteSelectedNodeOrEdge();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Control") {
        setCtrlKeyPressed(false);
      }
    };

    // Add event listeners for keydown and keyup
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      //exportGraphData();
    };
  }, [ctrlKeyPressed]);

  useEffect(() => {
    importGraphData();
  }, [props.input]);

  // node hovering........................
  const handleNodeHover = (node) => {
    setHoveredNode(node);
  };
  const handleNodeUnhover = () => {
    setHoveredNode(null);
  };

  let clickTimer = null;

  const handleCanvasClick = (e) => {
    if (clickTimer === null) {
      // This is a single click
      clickTimer = setTimeout(() => {
        if (
          e.target &&
          (e.target.getClassName() === "Text" ||
            e.target.getClassName() === "Circle" ||
            e.target.getClassName() === "Line")
        ) {
          // Do nothing or handle text click separately
          return;
        }

        const stage = stageRef.current;
        const { x, y } = stage.getPointerPosition();

        // now,,, edge can be selected if we click nereby....so implement this........

        let minDistance = Number.MAX_VALUE; // Initialize with a very large value
        let nearestEdge = null;

        edges.forEach((edge) => {
          const { start, end } = edge;
          const distance = pointToLineDistance(
            x,
            y,
            start.x,
            start.y,
            end.x,
            end.y
          );
          if (distance < minDistance) {
            minDistance = distance;
            nearestEdge = edge;
          }
        });

        //if clicked nere an edge, select that edge, else, create a node!!!

        if (nearestEdge && minDistance <= 1.0 * EDGECLICKRANGE) {
          if (selectedEdge == nearestEdge) setSelectedEdge(null);
          else setSelectedEdge(nearestEdge);
        } else {
          const newNode = { x, y, nodeIndex };
          setNodeIndex(nodeIndex + 1);

          setNodes([...nodes, newNode]);
        }
      }, 20);
    } else {
      // This is a double click
      clearTimeout(clickTimer);
      clickTimer = null;
      // Handle the double click logic here, if needed
    }
  };

  const handleNodeClick = (node) => {
    if (selectedNodes.length === 0) {
      setSelectedNodes([node]);
    } else if (selectedNodes.length === 1 && selectedNodes[0] !== node) {
      // don't add any more node if there exists one................
      const alreadyExists = edges.some(
        (edge) =>
          (edge.start === selectedNodes[0] && edge.end === node) ||
          (edge.start === node && edge.end === selectedNodes[0])
      );
      if (!alreadyExists) {
        const newEdge = {
          start: selectedNodes[0],
          end: node,
          weight: "assign",
        };
        //setEdgeIndex(edgeIndex + 1);
        setEdges([...edges, newEdge]);
        setSelectedNodes([]);

        while (true) {
          const newWeight = prompt("Enter weight for the new edge:", "");
          if (newWeight !== null && !isNaN(newWeight)) {
            newEdge.weight = newWeight;
            break;
          }
        }
      }
    } else if (selectedNodes.includes(node)) {
      // If the clicked node is already selected, unselect it
      setSelectedNodes(
        selectedNodes.filter((selectedNode) => selectedNode !== node)
      );
    }
  };

  // deleting node or edge is done by ctrl+x

  const deleteSelectedNodeOrEdge = () => {
    if (selectedNodes.length === 1) {
      const nodeToDelete = selectedNodes[0];
      const updatedNodes = nodes.filter((node) => node !== nodeToDelete);
      let updatedEdges = edges.filter(
        (edge) =>
          edge.start.x !== nodeToDelete.x &&
          edge.start.y !== nodeToDelete.y &&
          edge.end.x !== nodeToDelete.x &&
          edge.end.y !== nodeToDelete.y
      );

      if (selectedEdge != null) {
        updatedEdges = updatedEdges.filter((edge) => edge !== selectedEdge);
      }

      setNodes(updatedNodes);
      setEdges(updatedEdges);
      setSelectedNodes([]);
      setSelectedEdge(null);
    } else if (selectedEdge != null) {
      const updatedEdges = edges.filter((edge) => edge !== selectedEdge);
      setEdges(updatedEdges);
      setSelectedEdge(null);
    }
  };

  const changeEdgeWeight = (edge) => {
    const newWeight = prompt("Enter new weight for the edge:", edge.weight);
    if (newWeight !== null && !isNaN(newWeight)) {
      edge.weight = parseFloat(newWeight);
      setEdges([...edges]);
    }
  };

  const handleNodeDrag = (index, e) => {
    const newPosition = e.target.position();
    // Calculate the new position of the node
    const updatedX = newPosition.x;
    const updatedY = newPosition.y;

    // Calculate the boundaries of the stage
    const stage = stageRef.current;
    const stageWidth = stage.width();
    const stageHeight = stage.height();

    // Calculate the maximum allowed position for the node
    const maxX = stageWidth - RADIUS; // Assuming the node's radius is RADIUS
    const maxY = stageHeight - RADIUS;

    // Ensure the new position stays within the stage boundaries
    const clampedX = Math.max(stage.x() + RADIUS, Math.min(maxX, updatedX));
    const clampedY = Math.max(stage.y() + RADIUS, Math.min(maxY, updatedY));

    console.log("clampedX:", updatedX);
    console.log("clampedY:", updatedY);
    // Update the node's position
    const updatedNodes = [...nodes];

    if (selectedNodes.includes(updatedNodes[index])) {
      // If the clicked node is already selected, unselect it
      setSelectedNodes(
        selectedNodes.filter(
          (selectedNode) =>
            selectedNode.nodeIndex !== updatedNodes[index].nodeIndex
        )
      );
    }

    updatedNodes[index] = {
      x: clampedX,
      y: clampedY,
      nodeIndex: updatedNodes[index].nodeIndex,
    };

    setNodes(updatedNodes);
    const updatedEdges = edges.map((edge) => {
      if (edge.start.nodeIndex === nodes[index].nodeIndex) {
        return { ...edge, start: updatedNodes[index] };
      } else if (edge.end.nodeIndex === nodes[index].nodeIndex) {
        return { ...edge, end: updatedNodes[index] };
      }
      return edge;
    });

    setEdges(updatedEdges);

    e.target.to({
      x: clampedX,
      y: clampedY,
      duration: 0.5,
    });
  };

  const exportGraphData = () => {
    const graphData = {
      nodes,
      edges,
    };
    // Convert the JavaScript object to a JSON string
    const jsonData = JSON.stringify(graphData, null, 2);
    console.log("exporting");
    console.log(jsonData);

    // storing object in input..........

    // props.setInput(graphData);
    return graphData;
  };

  const importGraphData = () => {
    if (props.input != null) {
      // here input is props object....................
      console.log(props.input);

      //const data = JSON.parse(props.input);
      const data = props.input;
      console.log("importing");
      setNodes(data.nodes);
      setEdges(data.edges);
      console.log(data);
      // console.log(nodes);

      let maxIndex = 0;

      // Assuming nodes is an array of objects with an 'index' property
      data.nodes.forEach((node) => {
        if (node.nodeIndex > maxIndex) {
          maxIndex = node.nodeIndex;
        }
      });

      setNodeIndex(maxIndex + 1);
    }
  };

  const changeIndex = () => {};

  return (
    <div className="graph-container">
      <Stage
        width={0.6 * window.innerWidth}
        height={0.65 * window.innerHeight}
        onClick={handleCanvasClick}
        ref={stageRef}
      >
        <Layer>
          {edges.map((edge, index) => {
            // calculations.......................
            const dx = edge.end.x - edge.start.x;
            const dy = edge.end.y - edge.start.y;
            const angle = Math.atan2(dy, dx);
            const startOffsetX = Math.cos(angle) * RADIUS;
            const startOffsetY = Math.sin(angle) * RADIUS;
            const endOffsetX = Math.cos(angle + Math.PI) * RADIUS;
            const endOffsetY = Math.sin(angle + Math.PI) * RADIUS;

            //edge weight related.............................

            return (
              <React.Fragment key={index}>
                <Line
                  key={index}
                  points={[
                    edge.start.x + startOffsetX,
                    edge.start.y + startOffsetY,
                    edge.end.x + endOffsetX,
                    edge.end.y + endOffsetY,
                  ]}
                  stroke={selectedEdge !== edge ? "#879294" : "#ec3965"}
                  strokeWidth={selectedEdge !== edge ? 3 : 3}
                />

                <Text
                  x={(edge.start.x + edge.end.x) / 2 + 20}
                  y={(edge.start.y + edge.end.y) / 2}
                  text={edge.weight}
                  fontSize={25}
                  strokeWidth={selectedEdge !== edge ? 3 : 3}
                  background="red"
                  fill={selectedEdge !== edge ? "#879294" : "#ec3965"}
                  width={45}
                  draggable
                  onClick={() => changeEdgeWeight(edge)}
                />
              </React.Fragment>
            );
          })}
          {nodes.map((node, index) => (
            <Group
              key={index}
              x={node.x}
              y={node.y}
              draggable
              onMouseEnter={() => handleNodeHover(node)}
              onMouseLeave={handleNodeUnhover}
              onDragMove={(e) => handleNodeDrag(index, e)}
              onClick={() => handleNodeClick(node)}
            >
              <Circle
                radius={hoveredNode === node ? RADIUS * 1.2 : RADIUS}
                className={hoveredNode === node ? "node-hovered" : ""}
                fill={
                  selectedNodes.includes(node)
                    ? "#ec3965"
                    : hoveredNode === node
                    ? "#38bf27"
                    : "#a4a3a3"
                }
                stroke={
                  selectedNodes.includes(node)
                    ? ""
                    : hoveredNode === node
                    ? ""
                    : ""
                }
                strokeWidth={
                  selectedNodes.includes(node)
                    ? 0
                    : hoveredNode === node
                    ? 0
                    : 3
                }
                brightness={
                  selectedNodes.includes(node)
                    ? 0.5
                    : hoveredNode === node
                    ? 0
                    : 0.8
                }
              />
              <Text
                text={node.nodeIndex.toString()} // Display the node number
                align="center" // Center-align the text
                verticalAlign="middle" // Vertically align the text
                fontSize={30} // Set font size
                fill={
                  selectedNodes.includes(node)
                    ? "white"
                    : hoveredNode === node
                    ? "white"
                    : "white"
                } // Set text color
                ref={(nodeTextRef) => {
                  if (nodeTextRef) {
                    const textWidth = nodeTextRef.getClientRect().width;
                    const textHeight = nodeTextRef.getClientRect().height;
                    nodeTextRef.offsetX(textWidth / 2);
                    nodeTextRef.offsetY(textHeight / 2);
                  }
                }}
              />
            </Group>
          ))}
        </Layer>
      </Stage>
      {/* <div className="export-button-container">
        <button onClick={exportGraphData} className="export-button"></button>
      </div> */}
    </div>
  );
};

export default React.memo(forwardRef(GraphComponent));
