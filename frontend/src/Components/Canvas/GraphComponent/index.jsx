import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useCallback,
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
  Arrow,
} from "react-konva";
import Modal from "react-modal";
import "./styles.scss";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Cookies from "universal-cookie";
import { setLoading } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { SelectionField } from "../../InputFields";
import Info from "@mui/icons-material/Info";
const RADIUS = 30;
const EDGECLICKRANGE = 20;
const canvasWidth = 1440;
const canvasHeight = 1080;

Modal.setAppElement("#root");

const GraphComponent = (props, ref) => {
  const [userType, setUserType] = useState(0);
  const [edgeIndex, setEdgeIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  const [data, setData] = [props.input, props.setInput];
  // node: x, y, key, isSelected, isDraggable, isHovered, color
  // edge: start, end, isSelected, isHovered

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
  const [isDragging, setIsDragging] = useState(-1);
  //custom sets................................................................................................

  const setNodes = (nodes) => {
    setData((prevData) => ({
      ...prevData,
      nodes: nodes,
    }));
  };
  const setEdges = (edges) => {
    setData((prevData) => ({
      ...prevData,
      edges: edges,
    }));
  };
  const setSelectedEdges = (edges) => {
    // setData((prevData) => ({
    //   ...prevData,
    //   selected_edges: edges,
    // }));
  };

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
      setIsPromptOpen(false);
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
      handleReset: (resetData) => {
        importGraphData(resetData);
      },
      // getData: () => exportGraphData(),
    };
  });

  // const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    if (!windowRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      // Do what you want to do when the size of the element changes
      setWidth(windowRef.current.offsetWidth);
    });
    resizeObserver.observe(windowRef.current);
    return () => resizeObserver.disconnect(); // clean up
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
    importGraphData(props.input);
    setLoading(false);
  }, []);

  // node  and edge hovering........................
  const handleNodeHover = (node) => {
    setHoveredEdge(null);
    setHoveredNode(node);
  };
  const handleNodeUnhover = () => {
    console.log("Mouse Unhover", hoveredNode);
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

  const handleMouseMove = (e) => {
    if (
      e.target &&
      (e.target.getClassName() === "Text" ||
        e.target.getClassName() === "Circle")
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
      if (data.nodes[end] === undefined || data.nodes[start] === undefined) {
        return;
      }
      const distance = pointToLineDistance(
        x,
        y,
        data.nodes[start].x,
        data.nodes[start].y,
        data.nodes[end].x,
        data.nodes[end].y
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestEdge = edge;
      }
    });

    //if clicked nere an edge, select that edge, else, create a node!!!

    if (nearestEdge && minDistance <= 1.0 * EDGECLICKRANGE) {
      if (hoveredEdge == nearestEdge);
      else {
        setHoveredEdge(nearestEdge);

        document.body.style.cursor = "pointer";
      }
    } else if (hoveredEdge !== null) {
      document.body.style.cursor = "default";
      setHoveredEdge(null);
    }
  };
  const handleCanvasClick = (e) => {
    if (clickTimer === null) {
      // This is a single click
      clickTimer = setTimeout(() => {
        if (
          e.target &&
          (e.target.getClassName() === "Text" ||
            e.target.getClassName() === "Circle")
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
          if (
            data.nodes[end] === undefined ||
            data.nodes[start] === undefined
          ) {
            return;
          }
          const distance = pointToLineDistance(
            x,
            y,
            data.nodes[start].x,
            data.nodes[start].y,
            data.nodes[end].x,
            data.nodes[end].y
          );
          if (distance < minDistance) {
            minDistance = distance;
            nearestEdge = edge;
          }
        });

        //if clicked nere an edge, select that edge, else, create a node!!!

        if (nearestEdge && minDistance <= 1.0 * EDGECLICKRANGE) {
          if (selectedEdge === nearestEdge) setSelectedEdge(null);
          else {
            setSelectedEdge(nearestEdge);
            setSelectedNodes([]);
          }
        } else if (selectedEdge !== null) {
          setSelectedEdge(null);
        } else if (selectedNodes.length > 0) {
          setSelectedNodes([]);
        } else {
          if (
            props.mode === "preview" &&
            props?.controlParams?.add_node?.value === false
          )
            return;
          // const newNode = { x, y, nodeIndex };

          setSelectedEdge(null);
          setNodes({ ...data.nodes, [nodeIndex]: { x, y } });
          setNodeIndex(nodeIndex + 1);

          console.log({ ...data.nodes, [nodeIndex]: { x, y } });
        }
      }, 20);
    } else {
      // This is a double click
      clearTimeout(clickTimer);
      clickTimer = null;
      // Handle the double click logic here, if needed
    }
  };

  const handleNodeClick = (nodeKey) => {
    if (selectedNodes.length === 0) {
      setSelectedNodes([nodeKey]);
      setSelectedEdge(null);
    } else if (
      props.mode === "preview" &&
      props?.controlParams?.add_edge?.value === false
    ) {
      setSelectedNodes([nodeKey]);
      setSelectedEdge(null);
    } else if (selectedNodes.length === 1 && selectedNodes[0] !== nodeKey) {
      // don't add any more node if there exists one................
      const alreadyExists = data.edges.some(
        (edge) =>
          (edge.start === selectedNodes[0] && edge.end === nodeKey) ||
          (edge.start === nodeKey && edge.end === selectedNodes[0])
      );
      if (!alreadyExists) {
        setSelectedNodes([...selectedNodes, nodeKey]);

        if (props?.params?.weighted_edge?.value === true) {
          openPrompt(); // need to take weight input...........
        } else {
          const edges = data.edges;
          // just create the edge....................
          const newEdge = {
            start: selectedNodes[0],
            end: nodeKey,
            weight: "0",
          };
          //setEdgeIndex(edgeIndex + 1);
          setEdges([...edges, newEdge]);
          setSelectedNodes([]);
        }
      }
    } else if (selectedNodes.includes(nodeKey)) {
      // If the clicked node is already selected, unselect it
      setSelectedNodes((prev) =>
        prev.filter((selectedNode) => selectedNode !== nodeKey)
      );
      setSelectedEdge(null);
    }
  };

  // deleting node or edge is done by ctrl+x

  const deleteSelectedNode = () => {};

  const deleteSelectedNodeOrEdge = () => {
    //node deletion
    let updatedEdges = data.edges;
    if (selectedNodes.length === 1) {
      if (
        props.mode === "preview" &&
        props?.controlParams?.delete_node?.value === false
      )
        return;

      const deletedKey = selectedNodes[0];
      // const nodeToDelete = data.nodes.filter(
      //   (node) => node.nodeIndex === selectedNodes[0]
      // )[0];

      const updatedNodes = { ...data.nodes };
      delete updatedNodes[deletedKey];

      updatedEdges = data.edges.filter(
        (edge) => edge.start !== deletedKey && edge.end !== deletedKey
      );

      setNodes(updatedNodes);
      setSelectedNodes([]);

      if (selectedEdge != null) {
        updatedEdges = updatedEdges.filter((edge) => edge !== selectedEdge);
      }

      setEdges(updatedEdges);
      setSelectedEdge(null);
    }

    //edge deletion
    if (selectedEdge != null) {
      if (
        props.mode === "preview" &&
        props?.controlParams?.delete_edge?.value === false
      )
        return;
      updatedEdges = updatedEdges.filter((edge) => edge !== selectedEdge);
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

  const handleNodeDrag = (nodeKey, e) => {
    console.log("Dragging");
    if (
      props.mode === "preview" &&
      props?.controlParams?.drag_node?.value === false
    )
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

    // Update the node's position
    const updatedNodes = { ...data.nodes };

    if (selectedNodes.includes(nodeKey)) {
      // If the clicked node is already selected, unselect it
      setSelectedNodes(
        selectedNodes.filter((selectedNode) => selectedNode !== nodeKey)
      );
    }

    updatedNodes[nodeKey] = {
      x: clampedX,
      y: clampedY,
    };

    setNodes(updatedNodes);

    const updatedEdges = data.edges.map((edge) => {
      if (edge.start === nodeKey) {
        return { ...edge, start: nodeKey };
      } else if (edge.end === nodeKey) {
        return { ...edge, end: nodeKey };
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
  const findMaxKey = (myHashmap) => {
    const keys = Object.keys(myHashmap);
    if (keys.length === 0) {
      return null; // Handle the case when the hashmap is empty
    }
    return Math.max(...keys.map(Number));
  };

  const importGraphData = (newData) => {
    if (newData !== null && newData.nodes !== null) {
      let maxIndex = findMaxKey(newData.nodes);
      // Assuming nodes is an array of objects with an 'index' property
      setNodeIndex(maxIndex + 1);
    } else {
      setEdges([]);
      setNodes({});
      setSelectedEdges([]);
      setNodeIndex(0);
    }
  };

  const Header = () => (
    <div className=" top-5 left-5 absolute flex flex-row gap-3 z-10">
      {selectedEdge && (
        <IconButton
          sx={
            {
              // fontSize: "2rem",
              // width: "50px",
              // height: "50px",
            }
          }
          // onClick={() => alert(canvasInfo)}
        >
          <div className="flex items-center bu-text-primary cursor-pointer text-2xl">
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </IconButton>
      )}
      {selectedEdge && (
        <div className="no-ring-input">
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel
              htmlFor="outlined-adornment"
              className="bu-text-primary"
            >
              Edge weight
            </InputLabel>
            <OutlinedInput
              required
              placeholder="# of disks"
              inputProps={{
                step: 1,
                min: 1,
                max: 10,
              }}
              id="outlined-adornment"
              className="outline-none bu-text-primary"
              type="number"
              value={selectedEdge.weight}
              // onChange={handleNumberOfDisksChange}

              label={"Edge weight"}
              size="small"
            />
          </FormControl>
        </div>
      )}

      {selectedNodes.length === 1 && (
        <IconButton
          sx={
            {
              // fontSize: "2rem",
              // width: "50px",
              // height: "50px",
            }
          }
          // onClick={() => alert(canvasInfo)}
        >
          <div className="flex items-center bu-text-primary cursor-pointer text-2xl">
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </IconButton>
      )}
      {selectedNodes.length === 1 && (
        <div className="no-ring-input">
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel
              htmlFor="outlined-adornment"
              className="bu-text-primary"
            >
              Node ID
            </InputLabel>
            <OutlinedInput
              required
              placeholder="# of disks"
              inputProps={{
                step: 1,
                min: 1,
                max: 10,
              }}
              id="outlined-adornment"
              className="outlined-input bu-text-primary"
              type="text"
              value={selectedNodes[0]}
              // onChange={handleNumberOfDisksChange}
              label={"Node ID"}
              size="small"
            />
          </FormControl>
        </div>
      )}
    </div>
  );

  const CustomModal = () => (
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
  );
  return (
    <div className="w-full  relative" ref={windowRef}>
      {Header()}

      <div className="graph-container pt-16 overflow-hidden w-full">
        <Stage
          width={width} // small glitch // 1102
          // width={window.innerWidth * 0.57}
          height={500} // 630
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          ref={stageRef}
          // scaleX={Math.min(width / 882, 1)}
          // scaleY={Math.min(width / 882, 1)}
        >
          {data && (
            <Layer>
              {data.edges.map((edge, index) => {
                if (
                  data.nodes[edge.end] === undefined ||
                  data.nodes[edge.start] === undefined
                ) {
                  return <></>;
                }
                // calculations.......................
                const dx = data.nodes[edge.end].x - data.nodes[edge.start].x;
                const dy = data.nodes[edge.end].y - data.nodes[edge.start].y;
                const angle = Math.atan2(dy, dx);
                const startOffsetX = Math.cos(angle) * RADIUS;
                const startOffsetY = Math.sin(angle) * RADIUS;
                const endOffsetX =
                  Math.cos(angle + Math.PI) * RADIUS -
                  (props?.params["directed_edge"]?.value
                    ? 3 * Math.cos(angle)
                    : 0);
                const endOffsetY =
                  Math.sin(angle + Math.PI) * RADIUS -
                  (props?.params["directed_edge"]?.value
                    ? 3 * Math.sin(angle)
                    : 0);

                //edge direction related.............................

                // Calculate the position of the arrowhead
                {
                  /* const arrowheadX =
                  edge.end.x + endOffsetX - 10 * Math.cos(angle);
                const arrowheadY =
                  edge.end.y + endOffsetY - 10 * Math.sin(angle); */
                }

                const weightOffsetX =
                  ((data.nodes[edge.start].y - data.nodes[edge.end].y) /
                    Math.sqrt(
                      Math.pow(
                        data.nodes[edge.start].y - data.nodes[edge.end].y,
                        2
                      ) +
                        Math.pow(
                          data.nodes[edge.end].x - data.nodes[edge.start].x,
                          2
                        )
                    )) *
                  10;
                const weightOffsetY =
                  ((data.nodes[edge.end].x - data.nodes[edge.start].x) /
                    Math.sqrt(
                      Math.pow(
                        data.nodes[edge.start].y - data.nodes[edge.end].y,
                        2
                      ) +
                        Math.pow(
                          data.nodes[edge.end].x - data.nodes[edge.start].x,
                          2
                        )
                    )) *
                  10;
                return (
                  <React.Fragment key={index}>
                    <Group
                    // onClick={() => handleEdgeClick(edge)}
                    >
                      {props.params === null ||
                      !props.params["directed_edge"] ||
                      props.params["directed_edge"].value === false ? (
                        <Line
                          key={index}
                          points={[
                            data.nodes[edge.start].x + startOffsetX,
                            data.nodes[edge.start].y + startOffsetY,
                            data.nodes[edge.end].x + endOffsetX,
                            data.nodes[edge.end].y + endOffsetY,
                          ]}
                          onMouseEnter={() => {
                            // document.body.style.cursor = "pointer";
                            // handleEdgeHover(edge);
                          }}
                          onMouseLeave={() => {
                            // document.body.style.cursor = "default";
                            // handleEdgeUnhover();
                          }}
                          stroke={
                            selectedEdge === edge
                              ? "#ec3965"
                              : hoveredEdge !== edge
                                ? "#879294"
                                : "#2bb557"
                          }
                          strokeWidth={
                            selectedEdge !== edge && hoveredEdge !== edge
                              ? 3
                              : 6
                          }
                          // strokeWidth={Math.min(edge.weight / 5.0, 20)}
                        />
                      ) : (
                        <Arrow
                          key={index}
                          points={[
                            data.nodes[edge.start].x + startOffsetX,
                            data.nodes[edge.start].y + startOffsetY,
                            data.nodes[edge.end].x + endOffsetX,
                            data.nodes[edge.end].y + endOffsetY,
                          ]}
                          onMouseEnter={() => {
                            // document.body.style.cursor = "pointer";
                            // handleEdgeHover(edge);
                          }}
                          onMouseLeave={() => {
                            // document.body.style.cursor = "default";
                            // handleEdgeUnhover();
                          }}
                          stroke={
                            selectedEdge === edge
                              ? "#ec3965"
                              : hoveredEdge !== edge
                                ? "#879294"
                                : "#2bb557"
                          }
                          strokeWidth={
                            selectedEdge !== edge && hoveredEdge !== edge
                              ? 3
                              : 6
                          }
                          // strokeWidth={Math.min(edge.weight / 5.0, 20)}
                        />
                      )}
                    </Group>

                    {props?.params?.weighted_edge?.value && (
                      <Text
                        x={
                          weightOffsetX +
                          (data.nodes[edge.start].x + data.nodes[edge.end].x) /
                            2
                        }
                        y={
                          weightOffsetY +
                          (data.nodes[edge.start].y + data.nodes[edge.end].y) /
                            2
                        }
                        text={edge.weight}
                        fontSize={25}
                        strokeWidth={selectedEdge !== edge ? 5 : 3}
                        background="red"
                        fill={
                          selectedEdge === edge
                            ? "#ec3965"
                            : hoveredEdge !== edge
                              ? "#879294"
                              : "#2bb557"
                        }
                        width={45}
                        onClick={() => changeEdgeWeight(edge)}
                        rotation={
                          (Math.atan2(
                            data.nodes[edge.end].y - data.nodes[edge.start].y,
                            data.nodes[edge.end].x - data.nodes[edge.start].x
                          ) *
                            180) /
                          Math.PI
                        }
                      />
                    )}
                  </React.Fragment>
                );
              })}
              {Object.entries(data.nodes).map(([nodeKey, node]) => (
                <Group
                  key={nodeKey}
                  x={node.x}
                  y={node.y}
                  draggable={
                    props.mode === "preview" &&
                    props?.controlParams?.add_node?.value === false
                      ? false
                      : true
                  }
                  onMouseEnter={() => {
                    document.body.style.cursor = "pointer";
                    handleNodeHover(nodeKey);
                  }}
                  onMouseLeave={() => {
                    document.body.style.cursor = "default";
                    handleNodeUnhover();
                  }}
                  onDragMove={(e) => handleNodeDrag(nodeKey, e)}
                  onClick={() => handleNodeClick(nodeKey)}
                  onDragStart={() => {
                    // console.log("DRAAAAAAAAAAAAG");
                    setIsDragging(nodeKey);
                  }}
                  onDragEnd={() => {
                    // handleNodeHover(node);
                    setIsDragging(-1);
                  }}
                >
                  <Circle
                    radius={
                      isDragging === nodeKey
                        ? RADIUS * 1.2
                        : hoveredNode === nodeKey
                          ? 1.1 * RADIUS
                          : RADIUS
                    }
                    className={hoveredNode === nodeKey ? "node-hovered" : ""}
                    fill={
                      selectedNodes.includes(nodeKey)
                        ? "#ec3965"
                        : hoveredNode === nodeKey || isDragging === nodeKey
                          ? "#38bf27"
                          : "#a4a3a3"
                    }
                    // opacity={0.5}
                    stroke={
                      selectedNodes.includes(nodeKey)
                        ? ""
                        : hoveredNode === nodeKey
                          ? ""
                          : ""
                    }
                    strokeWidth={
                      selectedNodes.includes(nodeKey)
                        ? 0
                        : hoveredNode === nodeKey
                          ? 0
                          : 3
                    }
                    brightness={
                      selectedNodes.includes(nodeKey)
                        ? 0.5
                        : hoveredNode === nodeKey
                          ? 0
                          : 0.8
                    }
                    shadowOffsetX={isDragging === nodeKey ? 7 : 0}
                    shadowOffsetY={isDragging === nodeKey ? 7 : 0}
                    shadowColor="black"
                    shadowBlur={isDragging === nodeKey ? 10 : 0}
                    shadowOpacity={isDragging === nodeKey ? 0.6 : 0}
                  />
                  <Text
                    text={nodeKey.toString()} // Display the node number
                    align="center" // Center-align the text
                    verticalAlign="middle" // Vertically align the text
                    fontSize={30} // Set font size
                    fill={
                      selectedNodes.includes(nodeKey)
                        ? "white"
                        : hoveredNode === nodeKey
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
          )}
        </Stage>
      </div>

      {CustomModal()}
    </div>
  );
};

export default React.memo(forwardRef(GraphComponent));
