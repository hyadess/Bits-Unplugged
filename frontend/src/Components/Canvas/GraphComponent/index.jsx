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
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
} from "@mui/material";
import Cookies from "universal-cookie";
import { setLoading } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faArrowsToCircle,
  faCirclePlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { SelectionField } from "../../InputFields";
import Info from "@mui/icons-material/Info";
const RADIUS = 30;
const EDGECLICKRANGE = 20;
const canvasWidth = 1440;
const canvasHeight = 1080;

Modal.setAppElement("#root");

const colorMap = {
  Default: "#a4a3a3",
  Red: "#ec3965",
  Green: "#38bf27",
  Blue: "#6488ea",
  Yellow: "#fff44f",
  Purple: "#d648d7",
  Pink: "#ff69b4",
  Orange: "#ff8c00",
  Brown: "#635147",
};
const GraphComponent = (props, ref) => {
  const [userType, setUserType] = useState(0);
  const [edgeIndex, setEdgeIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  const [data, setData] = [props.input, props.setInput];
  // node: x, y, key, isSelected, isDraggable, isHovered, color
  // edge: start, end, isSelected, isHovered

  //node and edge hover and select
  const [selectedNodes, setSelectedNodes] = useState([]);
  // const [selectedEdge, setSelectedEdge] = useState(null);
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
  const [addNodeMode, setAddNodeMode] = useState(false);
  const [addEdgeMode, setAddEdgeMode] = useState(false);
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

  const updateSelectedEdges = (newSelectedEdges) => {
    const sortedEdges = [...newSelectedEdges].sort((a, b) => {
      // Convert x and y to integers
      const xA = parseInt(a.start, 10);
      const yA = parseInt(a.end, 10);
      const xB = parseInt(b.start, 10);
      const yB = parseInt(b.end, 10);

      // Compare x values
      if (xA === xB) {
        // If x values are equal, compare y values
        return yA - yB;
      } else {
        return xA - xB;
      }
    });

    console.log(sortedEdges);
    setData((prevState) => ({
      ...prevState,
      selectedEdges: sortedEdges,
    }));
  };

  const setSelectedEdges = (edges) => {
    setData((prevData) => ({
      ...prevData,
      selectedEdges: edges,
    }));
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
        if (!addNodeMode && !addEdgeMode) {
          document.body.style.cursor = "pointer";
        }
      }
    } else if (hoveredEdge !== null) {
      if (!addNodeMode && !addEdgeMode) {
        document.body.style.cursor = "default";
      }
      setHoveredEdge(null);
    }
  };
  const handleCanvasClick = (e) => {
    console.log(e.target.getClassName());
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
          if (
            data.selectedEdges.some((selectedEdge) =>
              shallowEqualityCheck(selectedEdge, nearestEdge)
            )
          ) {
            // setSelectedEdge(null);
            updateSelectedEdges(
              data.selectedEdges.filter(
                (selectedEdge) => selectedEdge !== nearestEdge
              )
            );
          } else {
            // setSelectedEdge(nearestEdge);
            updateSelectedEdges([...data.selectedEdges, nearestEdge]);
            setSelectedNodes([]);
          }
        } else if (data.selectedEdges.length > 0) {
          setSelectedEdges([]);
        } else if (selectedNodes.length > 0) {
          setSelectedNodes([]);
        } else {
          if (
            (props.mode === "preview" &&
              props?.controlParams?.add_node?.value === false) ||
            !addNodeMode
          )
            return;
          // const newNode = { x, y, nodeIndex };

          setSelectedEdges([]);

          setNodes({
            ...data.nodes,
            [nodeIndex]: { x: x, y: y, label: nodeIndex, color: "Default" },
          });
          setNodeIndex(nodeIndex + 1);

          console.log({ ...data.nodes, [nodeIndex]: { x, y, nodeIndex } });
        }
      }, 20);
    } else {
      // This is a double click
      clearTimeout(clickTimer);
      clickTimer = null;
      // Handle the double click logic here, if needed
    }
    console.log(data.selectedEdges);
  };

  const handleNodeClick = (nodeKey) => {
    if (selectedNodes.length === 0) {
      setSelectedNodes([nodeKey]);
      setSelectedEdges([]);
    } else if (selectedNodes.includes(nodeKey)) {
      // If the clicked node is already selected, unselect it
      setSelectedNodes((prev) =>
        prev.filter((selectedNode) => selectedNode !== nodeKey)
      );
      console.log("Double click");
      setSelectedEdges([]);
    } else if (
      (props.mode === "preview" &&
        props?.controlParams?.add_edge?.value === false) ||
      addEdgeMode === false
    ) {
      setSelectedNodes([nodeKey]);
      setSelectedEdges([]);
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
          // setAddEdgeMode(false);
          // document.body.style.
        }
      }
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

      // if (data.selectedEdges.length > 0) {
      //   updatedEdges = updatedEdges.filter((edge) =>
      //     data.selectedEdges.includes(edge)
      //   );
      // }

      setEdges(updatedEdges);

      setSelectedEdges([]);
    }

    //edge deletion
    if (data.selectedEdges.length > 0) {
      if (
        props.mode === "preview" &&
        props?.controlParams?.delete_edge?.value === false
      )
        return;

      updatedEdges = updatedEdges.filter(
        (edge) =>
          !data.selectedEdges.some((selectedEdge) =>
            shallowEqualityCheck(selectedEdge, edge)
          )
      );
      setEdges(updatedEdges);

      setSelectedEdges([]);
    }
  };

  const changeEdgeWeight = (edge) => {
    // no weight change for unweighted graphs.........

    if (
      props.mode === "preview" &&
      props?.params?.weighted_edge?.value === false
    )
      return;

    if (
      props.mode === "preview" &&
      props?.controlParams?.edit_weight?.value === false
    )
      return;
    // weight change prompt........................
    const newWeight = prompt("Enter new weight for the edge:", edge.weight);
    if (newWeight !== null && !isNaN(newWeight)) {
      edge.weight = parseFloat(newWeight);
      setEdges([...data.edges]);
    }
  };

  const isDragAllowed = () => {
    return (
      props.mode === "edit" || props?.controlParams?.drag_node?.value === true
    );
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
      label: updatedNodes[nodeKey].label,
      color: updatedNodes[nodeKey].color,
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
  const MenuProps = {
    PaperProps: {
      style: {
        maxWidth: "5rem",
      },
    },
  };
  const Header = () => (
    <div className="top-2 left-2 absolute flex flex-row gap-2 z-10">
      {(props.mode === "edit" ||
        props?.controlParams?.add_node?.value === true) &&
        !(
          (props.mode === "edit" ||
            props?.controlParams?.delete_edge?.value === true) &&
          data?.selectedEdges.length > 0
        ) &&
        !(
          (props.mode === "edit" ||
            props?.controlParams?.delete_node?.value === true) &&
          selectedNodes.length > 0
        ) && (
          <Tooltip
            title={<h1 className="text-lg text-white">Add Node</h1>}
            placement="top"
            // TransitionComponent={Zoom}
            arrow
            size="large"
          >
            <IconButton
              sx={
                {
                  // fontSize: "2rem",
                  // width: "50px",
                  // height: "50px",
                }
              }
              onClick={() => {
                if (addNodeMode) document.body.style.cursor = "default";
                else document.body.style.cursor = "crosshair";
                if (!addNodeMode) setAddEdgeMode(false);
                setAddNodeMode((prev) => !prev);
              }}
            >
              <div className="flex items-center bu-text-primary cursor-pointer text-[1.8rem]">
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
            </IconButton>
          </Tooltip>
        )}
      {(props.mode === "edit" ||
        props?.controlParams?.add_edge?.value === true) &&
        !(
          (props.mode === "edit" ||
            props?.controlParams?.delete_edge?.value === true) &&
          data?.selectedEdges.length > 0
        ) &&
        !(
          (props.mode === "edit" ||
            props?.controlParams?.delete_node?.value === true) &&
          selectedNodes.length > 0
        ) && (
          <Tooltip
            title={<h1 className="text-lg text-white">Add Edge</h1>}
            placement="top"
            // TransitionComponent={Zoom}
            arrow
            size="large"
          >
            <IconButton
              sx={
                {
                  // fontSize: "2rem",
                  // width: "50px",
                  // height: "50px",
                }
              }
              onClick={() => {
                if (addEdgeMode) document.body.style.cursor = "default";
                else document.body.style.cursor = "copy";
                if (!addEdgeMode) setAddNodeMode(false);
                setAddEdgeMode((prev) => !prev);
              }}
            >
              <div className="flex items-center bu-text-primary cursor-pointer text-[1.8rem]">
                <FontAwesomeIcon icon={faArrowsToCircle} />
              </div>
            </IconButton>
          </Tooltip>
        )}
      {(props.mode === "edit" ||
        props?.controlParams?.delete_edge?.value === true) &&
        data?.selectedEdges.length > 0 && (
          <IconButton
            sx={
              {
                // fontSize: "2rem",
                // width: "50px",
                // height: "50px",
              }
            }
            onClick={() => deleteSelectedNodeOrEdge()}
          >
            <div className="flex items-center bu-text-primary cursor-pointer text-2xl">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </IconButton>
        )}
      {(props.mode === "edit" ||
        props?.controlParams?.edit_weight?.value === true) &&
        data?.selectedEdges.length === 1 && (
          <div className="no-ring-input flex-center p-1">
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel
                htmlFor="outlined-adornment"
                className="bu-text-primary"
              >
                Edge weight
              </InputLabel>
              <OutlinedInput
                required
                placeholder="Edge weight"
                inputProps={{
                  step: 1,
                  min: 1,
                  // max: 10,
                }}
                id="outlined-adornment"
                className="outline-none bu-text-primary"
                type="number"
                value={data?.selectedEdges[0]?.weight}
                onChange={(e) => {
                  data.edges = data.edges.filter(
                    (edge) =>
                      JSON.stringify(edge) !==
                      JSON.stringify(data?.selectedEdges[0])
                  );
                  data.selectedEdges[0].weight = e.target.value;
                  setEdges([...data.edges, data.selectedEdges[0]]);
                }}
                label={"Edge weight"}
                size="small"
                sx={{ width: "10rem" }}
              />
            </FormControl>
          </div>
        )}

      {(props.mode === "edit" ||
        props?.controlParams?.delete_node?.value === true) &&
        selectedNodes.length === 1 && (
          <IconButton
            sx={
              {
                // fontSize: "2rem",
                // width: "50px",
                // height: "50px",
              }
            }
            onClick={() => deleteSelectedNodeOrEdge()}
          >
            <div className="flex items-center bu-text-primary cursor-pointer text-2xl">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </IconButton>
        )}
      {props.mode === "edit" && selectedNodes.length === 1 && (
        <div className="no-ring-input flex-center p-1">
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel
              htmlFor="outlined-adornment"
              className="bu-text-primary"
            >
              Node Label
            </InputLabel>
            <OutlinedInput
              required
              placeholder="Node Label"
              id="outlined-adornment"
              className="outlined-input bu-text-primary"
              type="text"
              value={data?.nodes[selectedNodes[0]]?.label}
              onChange={(e) => {
                data.nodes[selectedNodes[0]].label = e.target.value;
                setNodes(data.nodes);
              }}
              label={"Node Label"}
              size="small"
              sx={{ width: "10rem" }}
            />
          </FormControl>
        </div>
      )}

      {(props.mode === "edit" ||
        props?.controlParams?.edit_color?.value === true) &&
        selectedNodes.length === 1 && (
          <div className="no-ring-input flex-center p-1">
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel
                htmlFor="outlined-adornment"
                className="bu-text-primary"
              >
                Node Color
              </InputLabel>
              <Select
                fullWidth
                // required
                id="outlined-adornment"
                className="outlined-input bu-text-primary"
                value={data?.nodes[selectedNodes[0]]?.color}
                onChange={(e) => {
                  data.nodes[selectedNodes[0]].color = e.target.value;
                  setNodes(data.nodes);
                }}
                input={<OutlinedInput label={"Node Color"} />}
                sx={{ width: "10rem" }}
              >
                {Object.keys(colorMap).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
    </div>
  );
  function shallowEqualityCheck(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  const CustomModal = () => (
    <Modal
      className="modal-container bu-nav-color z-[100]"
      isOpen={isPromptOpen}
      onRequestClose={closePrompt}
      contentLabel="Edge Weight Input"
    >
      <div className="flex flex-col gap-5 z-[100]">
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
      {/* <Tooltip
        title="Click anywhere to add a node"
        followCursor
        size="large"
        // open={addNodeMode}
        // onOpen={()=>{}}
        // onClose={()=>{}}
      >
        <div className="absolute h-full w-full z-10"></div>
      </Tooltip> */}

      <Tooltip
        title={
          addNodeMode ? (
            <h1 className="text-md">
              Click anywhere in the canvas to add a node
              <br />
              Click on the "Add Node" icon again to cancel
            </h1>
          ) : addEdgeMode ? (
            <h1 className="text-md">
              Click on two nodes to add an edge between them
              <br />
              Click on the "Add Edge" icon again to cancel
            </h1>
          ) : (
            <></>
          )
        }
        followCursor
        size="large"
        open={(addNodeMode || addEdgeMode) && !isPromptOpen}
        onOpen={() => {}}
        onClose={() => {}}
      >
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
                      <Group>
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
                            stroke={
                              data.selectedEdges.some((selectedEdge) =>
                                shallowEqualityCheck(selectedEdge, edge)
                              )
                                ? "#ec3965"
                                : hoveredEdge !== edge
                                  ? "#879294"
                                  : "#2bb557"
                            }
                            strokeWidth={
                              !data.selectedEdges.some((selectedEdge) =>
                                shallowEqualityCheck(selectedEdge, edge)
                              ) && hoveredEdge !== edge
                                ? 3
                                : 6
                            }
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
                            stroke={
                              data.selectedEdges.some((selectedEdge) =>
                                shallowEqualityCheck(selectedEdge, edge)
                              )
                                ? "#ec3965"
                                : hoveredEdge !== edge
                                  ? "#879294"
                                  : "#2bb557"
                            }
                            strokeWidth={
                              !data.selectedEdges.some((selectedEdge) =>
                                shallowEqualityCheck(selectedEdge, edge)
                              ) && hoveredEdge !== edge
                                ? 3
                                : 6
                            }
                          />
                        )}
                      </Group>

                      {props?.params?.weighted_edge?.value && (
                        <Text
                          x={
                            weightOffsetX +
                            (data.nodes[edge.start].x +
                              data.nodes[edge.end].x) /
                              2
                          }
                          y={
                            weightOffsetY +
                            (data.nodes[edge.start].y +
                              data.nodes[edge.end].y) /
                              2
                          }
                          text={edge.weight}
                          fontSize={25}
                          strokeWidth={
                            data.selectedEdges.some((selectedEdge) =>
                              shallowEqualityCheck(selectedEdge, edge)
                            )
                              ? 3
                              : 5
                          }
                          background="red"
                          fill={
                            data.selectedEdges.some((selectedEdge) =>
                              shallowEqualityCheck(selectedEdge, edge)
                            )
                              ? "#ec3965"
                              : hoveredEdge !== edge
                                ? "#879294"
                                : "#2bb557"
                          }
                          width={45}
                          // onClick={() => changeEdgeWeight(edge)}
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
                      props?.controlParams?.drag_node?.value === false
                        ? false
                        : true
                    }
                    onMouseEnter={() => {
                      if (!addNodeMode && !addEdgeMode) {
                        document.body.style.cursor = "pointer";
                      }
                      handleNodeHover(nodeKey);
                    }}
                    onMouseLeave={() => {
                      if (!addNodeMode && !addEdgeMode) {
                        document.body.style.cursor = "default";
                      }
                      handleNodeUnhover();
                    }}
                    onDragMove={(e) => handleNodeDrag(nodeKey, e)}
                    onClick={() => handleNodeClick(nodeKey)}
                    onDragStart={() => {
                      setIsDragging(nodeKey);
                    }}
                    onDragEnd={() => {
                      setIsDragging(-1);
                    }}
                  >
                    <Circle
                      radius={
                        // isDragging === nodeKey
                        //   ? RADIUS * 1.2
                        //   : hoveredNode === nodeKey
                        //     ? 1.1 * RADIUS
                        //     : RADIUS
                        RADIUS
                      }
                      className={hoveredNode === nodeKey ? "node-hovered" : ""}
                      fill={
                        // selectedNodes.includes(nodeKey)
                        //   ? "#ec3965"
                        //   : hoveredNode === nodeKey || isDragging === nodeKey
                        //     ? "#38bf27"
                        //     : "#a4a3a3"
                        colorMap[data.nodes[nodeKey].color]
                      }
                      // opacity={0.5}
                      stroke={
                        selectedNodes.includes(nodeKey)
                          ? "#ec3965"
                          : hoveredNode === nodeKey || isDragging === nodeKey
                            ? "#38bf27"
                            : "#a4a3a3"
                      }
                      strokeEnabled={true}
                      strokeWidth={
                        selectedNodes.includes(nodeKey)
                          ? 6
                          : hoveredNode === nodeKey || isDragging === nodeKey
                            ? 5
                            : 0
                      }
                      brightness={
                        selectedNodes.includes(nodeKey)
                          ? 0.5
                          : hoveredNode === nodeKey || isDragging === nodeKey
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
                      text={data.nodes[nodeKey].label.toString()} // Display the node number
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
      </Tooltip>

      {CustomModal()}
    </div>
  );
};

export default React.memo(forwardRef(GraphComponent));
