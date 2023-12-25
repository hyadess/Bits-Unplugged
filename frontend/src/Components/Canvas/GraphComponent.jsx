import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
} from "react";
import {
  Stage,
  Layer,
  Circle,
  Line,
  Text,
  Group,
  RegularPolygon,
  Rect,
  Shape,
} from "react-konva";
import Modal from "react-modal";
import "./GraphComponent.scss";
import { Button } from "@mui/material";
import Cookies from "universal-cookie";
import { setLoading } from "../../App";
const RADIUS = 30;
const EDGECLICKRANGE = 20;
const canvasWidth = 1440;
const canvasHeight = 1080;

Modal.setAppElement("#root");

const GraphComponent = (props, ref) => {
  const [userType, setUserType] = useState(0);
  const [edgeIndex, setEdgeIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  const data=props.input;
  const setData=props.setInput;
  //node and edge hover and select
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  //controls
  const [ctrlKeyPressed, setCtrlKeyPressed] = useState(false);
  const [zoom, setZoom] = useState(1);
  const stageRef = useRef(null);
  const windowRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  //custom sets................................................................................................

  const setNodes = (nodes) => {
    props.setInput((prevData) => ({
      ...prevData,
      nodes: nodes,
    }));
  };
  const setEdges = (edges) => {
    props.setInput((prevData) => ({
      ...prevData,
      edges: edges,
    }));
  };
  // useEffect(() => {
  //   setData(props.input);
  // }, [props.input]);

  //...........................................................................................................

  //for edge weight entering prompt..............................................................................
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [curEdgeWeight, setCurEdgeWeight] = useState("");

  const openPrompt = () => {
    setIsPromptOpen(true);
  };

  const closePrompt = () => {
    setCurEdgeWeight("");
    setSelectedNodes([selectedNodes[0]]);
    setIsPromptOpen(false);
  };

  const handlePromptSubmit = (value) => {
    setCurEdgeWeight(value);
    const edges = data.edges;
    if (
      curEdgeWeight === "" ||
      curEdgeWeight === null ||
      isNaN(curEdgeWeight)
    ) {
      setCurEdgeWeight("");
      setSelectedNodes([selectedNodes[0]]);
      return;
    }

    const newEdge = {
      start: selectedNodes[0],
      end: selectedNodes[1],
      weight: curEdgeWeight,
    };
    //setEdgeIndex(edgeIndex + 1);
    setEdges([...edges, newEdge]);
    setSelectedNodes([]);

    setCurEdgeWeight("");
    setIsPromptOpen(false);
  };
  //............................................................................................................

  useImperativeHandle(ref, () => {
    return {
      handleReset: () => {
        importGraphData();
      },
      getData: () => exportGraphData(),
    };
  });

  useLayoutEffect(() => {
    const updateParentWidth = () => {
      if (windowRef.current) {
        setWidth(windowRef.current.offsetWidth);
        setHeight(windowRef.current.offsetHeight);
      }
    };
    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);
    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, []);

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

  // at start..............
  useEffect(() => {
    const cookies = new Cookies();
    setUserType(cookies.get("type"));
    importGraphData();
    setLoading(false);
  }, []);

  // node  and edge hovering........................
  const handleNodeHover = (node) => {
    setHoveredNode(node);
  };
  const handleNodeUnhover = () => {
    setHoveredNode(null);
  };
  const handleEdgeHover = (edge) => {
    setHoveredEdge(edge);
  };
  const handleEdgeUnhover = () => {
    setHoveredEdge(null);
  };

  //node and edge creation and deletion.................

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

        data.edges.forEach((edge) => {
          const { start, end, weight } = edge;
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
        } else if (selectedEdge !== null) {
          setSelectedEdge(null);
        } else if (selectedNodes.length > 0) {
          setSelectedNodes([]);
        } else {
          //check if i have control params permission to add nodes
          if (props.controlParams === null || !props.controlParams["add_node"])
            return;
          if (userType === 0 && props.controlParams["add_node"].value === false)
            return;
          const newNode = { x, y, nodeIndex };
          setNodeIndex(nodeIndex + 1);

          setNodes([...data.nodes, newNode]);
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
      const alreadyExists = data.edges.some(
        (edge) =>
          (edge.start.nodeIndex === selectedNodes[0].nodeIndex &&
            edge.end.nodeIndex === node.nodeIndex) ||
          (edge.start.nodeIndex === node.nodeIndex &&
            edge.end.nodeIndex === selectedNodes[0].nodeIndex)
      );
      if (!alreadyExists) {
        setSelectedNodes([...selectedNodes, node]);
        if (
          props.params !== null &&
          props.params["weighted_edge"] &&
          props.params["weighted_edge"].value === true
        )
          openPrompt(); // need to take weight input...........
        else {
          const edges = data.edges;
          // just create the edge....................
          const newEdge = {
            start: selectedNodes[0],
            end: node,
            weight: "0",
          };
          //setEdgeIndex(edgeIndex + 1);
          setEdges([...edges, newEdge]);
          setSelectedNodes([]);
        }
      }
    } else if (selectedNodes.includes(node)) {
      // If the clicked node is already selected, unselect it
      setSelectedNodes(
        selectedNodes.filter((selectedNode) => selectedNode !== node)
      );
    }
  };

  const handleEdgeClick = (edge) => {
    if (selectedEdge == edge) setSelectedEdge(null);
    else setSelectedEdge(edge);
  };

  // deleting node or edge is done by ctrl+x

  const deleteSelectedNodeOrEdge = () => {
    //node deletion

    if (selectedNodes.length === 1) {
      if (props.controlParams === null || !props.controlParams["delete_node"])
        return;
      if (userType === 0 && props.controlParams["delete_node"].value === false)
        return;
      const nodeToDelete = selectedNodes[0];
      const updatedNodes = data.nodes.filter((node) => node !== nodeToDelete);
      let updatedEdges = data.edges.filter(
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
    }
    //edge deletion
    if (selectedEdge != null) {
      if (props.controlParams === null || !props.controlParams["delete_edge"])
        return;
      if (userType === 0 && props.controlParams["delete_edge"].value === false)
        return;
      const updatedEdges = data.edges.filter((edge) => edge !== selectedEdge);
      setEdges(updatedEdges);
      setSelectedEdge(null);
    }
  };

  const changeEdgeWeight = (edge) => {
    // no weight change for unweighted graphs.........
    if (props.params === null || !props.params["weighted_edge"]) return;
    if (userType === 1 && props.params["weighted_edge"].value === false) return;

    // weight change prompt........................
    const newWeight = prompt("Enter new weight for the edge:", edge.weight);
    if (newWeight !== null && !isNaN(newWeight)) {
      edge.weight = parseFloat(newWeight);
      setEdges([...data.edges]);
    }
  };

  const handleNodeDrag = (index, e) => {
    if (props.controlParams === null || !props.controlParams["drag_node"])
      return;
    if (userType === 0 && props.controlParams["drag_node"].value === false)
      return;
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
    const updatedNodes = [...data.nodes];

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
    const updatedEdges = data.edges.map((edge) => {
      if (edge.start.nodeIndex === data.nodes[index].nodeIndex) {
        return { ...edge, start: updatedNodes[index] };
      } else if (edge.end.nodeIndex === data.nodes[index].nodeIndex) {
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

  //export and import data....................

  const exportGraphData = () => {
    const nodes = data.nodes;
    const edges = data.edges;
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
      console.log("importing");
      setData(props.input);
      console.log(data);

      let maxIndex = 0;

      // Assuming nodes is an array of objects with an 'index' property
      data.nodes.forEach((node) => {
        if (node.nodeIndex > maxIndex) {
          maxIndex = node.nodeIndex;
        }
      });

      setNodeIndex(maxIndex + 1);
    }
    // data=props.input;
    // setData=props.setInput;
  };

  // const changeGraphType = () => {
  //   if (props.params != null) {
  //     setData((prevData) => ({
  //       ...prevData,
  //       directed: props.params["directed_edge"]
  //         ? props.params["directed_edge"].value
  //         : prevData.directed,
  //     }));
  //     setData((prevData) => ({
  //       ...prevData,
  //       weighted: props.params["weighted_edge"]
  //         ? props.params["weighted_edge"].value
  //         : prevData.weighted,
  //     }));
  //   }
  // };

  const changeIndex = () => {};

  return (
    <div className="graph-container w-full pt-16" ref={windowRef}>
      <Stage
        width={width}
        height={500}
        onClick={handleCanvasClick}
        ref={stageRef}
        // scaleX={Math.min(window.innerWidth / 970, 1)}
        // scaleY={Math.min(window.innerWidth / 900, 1)}
      >
        <Layer>
          {data.edges.map((edge, index) => {
            // calculations.......................
            const dx = edge.end.x - edge.start.x;
            const dy = edge.end.y - edge.start.y;
            const angle = Math.atan2(dy, dx);
            const startOffsetX = Math.cos(angle) * RADIUS;
            const startOffsetY = Math.sin(angle) * RADIUS;
            const endOffsetX = Math.cos(angle + Math.PI) * RADIUS;
            const endOffsetY = Math.sin(angle + Math.PI) * RADIUS;

            //edge direction related.............................

            // Calculate the position of the arrowhead
            const arrowheadX = edge.end.x + endOffsetX - 10 * Math.cos(angle);
            const arrowheadY = edge.end.y + endOffsetY - 10 * Math.sin(angle);

            return (
              <React.Fragment key={index}>
                <Group onClick={() => handleEdgeClick(edge)}>
                  <Line
                    key={index}
                    points={[
                      edge.start.x + startOffsetX,
                      edge.start.y + startOffsetY,
                      edge.end.x + endOffsetX,
                      edge.end.y + endOffsetY,
                    ]}
                    onMouseEnter={() => {
                      document.body.style.cursor = "pointer";
                      handleEdgeHover(edge);
                    }}
                    onMouseLeave={() => {
                      document.body.style.cursor = "default";
                      handleEdgeUnhover();
                    }}
                    stroke={
                      hoveredEdge === edge
                        ? "#2bb557"
                        : selectedEdge !== edge
                        ? "#879294"
                        : "#ec3965"
                    }
                    strokeWidth={
                      selectedEdge !== edge && hoveredEdge !== edge ? 3 : 6
                    }
                    // strokeWidth={Math.min(edge.weight / 5.0, 20)}
                  />
                  {props.params === null ||
                  !props.params["directed_edge"] ||
                  props.params["directed_edge"].value === false ? (
                    <></>
                  ) : (
                    <RegularPolygon
                      sides={3} // Triangle for arrowhead
                      radius={12} // Adjust the size of the arrowhead
                      x={arrowheadX}
                      y={arrowheadY}
                      rotation={angle * (180 / Math.PI) + 90}
                      fill={
                        hoveredEdge === edge
                          ? "#2bb557"
                          : selectedEdge !== edge
                          ? "#879294"
                          : "#ec3965"
                      }
                    />
                  )}
                </Group>

                {props.params === null ||
                !props.params["weighted_edge"] ||
                props.params["weighted_edge"].value === false ? (
                  <></>
                ) : (
                  <Text
                    x={(edge.start.x + edge.end.x) / 2 + 20}
                    y={(edge.start.y + edge.end.y) / 2}
                    text={edge.weight}
                    fontSize={25}
                    strokeWidth={selectedEdge !== edge ? 3 : 3}
                    background="red"
                    fill={
                      hoveredEdge === edge
                        ? "#2bb557"
                        : selectedEdge !== edge
                        ? "#879294"
                        : "#ec3965"
                    }
                    width={45}
                    draggable
                    onClick={() => changeEdgeWeight(edge)}
                  />
                )}
              </React.Fragment>
            );
          })}
          {data.nodes.map((node, index) => (
            <Group
              key={index}
              x={node.x}
              y={node.y}
              draggable={
                props.controlParams === null ||
                !props.controlParams["drag_node"]
                  ? false
                  : props.controlParams["drag_node"].value
              }
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

      <Modal
        className="modal-container bu-nav-color"
        isOpen={isPromptOpen}
        onRequestClose={closePrompt}
        contentLabel="Edge Weight Input"
      >
        <div className="flex flex-col gap-5">
          <p className="bu-text-primary font-bold text-xl">ENTER THE WEIGHT</p>
          <input
            className="bu-input-primary rounded-lg"
            type="number"
            value={curEdgeWeight}
            onChange={(e) => setCurEdgeWeight(e.target.value)}
            placeholder="Edge Weight"
            // autofocus
          />
          <div className="flex flex-row gap-5 justify-center">
            <button
              className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-delete w-full"
              onClick={closePrompt}
            >
              CANCEL
            </button>
            <button
              className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary w-full"
              onClick={() => handlePromptSubmit(curEdgeWeight)}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(forwardRef(GraphComponent));
