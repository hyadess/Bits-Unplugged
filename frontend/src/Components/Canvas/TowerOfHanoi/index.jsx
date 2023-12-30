import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Stage, Layer, Rect, Label, Text, Tag, Line, Group } from "react-konva";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Cookies from "universal-cookie";

import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import IconButton from "@mui/material/IconButton";
// import { NumberField } from "../InputFields/inputField";
import "./styles.scss";
import { setLoading } from "../../../App";
// import "bootstrap/dist/css/bootstrap.min.css";

const cookie = new Cookies();
const pegWidth = 200;
const diskHeight = 20;
const diskWidthFactor = 18;
const baseY = 220;
const sep = 10;
const colors = [
  "maroon",
  "darkslategrey",
  "green",
  "gold",
  "orange",
  "lightsalmon",
  "aquamarine",
  "cyan",
  "cadetblue",
  "darkkhaki",
];

const KonvaButton = (props) => {
  return (
    <Label onClick={props.onClick} x={props.x} y={props.y}>
      <Tag
        fill="black"
        lineJoin="round"
        // shadowColor="black"
        // shadowBlur={10}
        // shadowOffset={10}
        shadowOpacity={0.5}
        cornerRadius={10}
      ></Tag>
      <Text
        text={props.text}
        fontSize={18}
        fill="white"
        padding={5}
        fontFamily="Calibri"
      />
    </Label>
  );
};
const UndoRedoButton = ({ handleUndo, handleRedo }) => {
  return (
    <div className="absolute bottom-0 left-0 flex flex-row px-2">
      <IconButton
        sx={{
          fontSize: "2rem",
        }}
        onClick={() => handleUndo()}
      >
        <div className="flex items-center bu-text-primary">
          <UndoIcon sx={{ fontSize: "2rem" }} />
        </div>
      </IconButton>
      <IconButton
        sx={{
          fontSize: "2rem",
        }}
        onClick={() => handleRedo()}
      >
        <div className="flex items-center bu-text-primary">
          <RedoIcon sx={{ fontSize: "2rem" }} />
        </div>
      </IconButton>
    </div>
  );
};
const NumberOfDisksInput = ({ data, handleNumberOfDisksChange }) => (
  <div className="hbox w-20%">
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="bu-text-primary">
        Number of Disks
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
        type="number"
        value={data.numberOfDisks}
        onChange={handleNumberOfDisksChange}
        label={"Number of Disks"}
        size="small"
      />
    </FormControl>
  </div>
);
const PegElements = ({ data, hoveredPeg }) =>
  data !== null &&
  data.pegs.map((peg, index) => {
    return (
      <Group key={index}>
        <Rect
          // key={index}
          x={pegWidth / 2 + pegWidth * index - 5 + index * sep}
          y={25}
          width={10}
          height={baseY}
          fill="black"
          shadowBlur={hoveredPeg === index ? 20 : 0}
          shadowOpacity={hoveredPeg === index ? 0.6 : 0}
          shadowOffsetX={0}
          shadowOffsetY={0}
          cornerRadius={[5, 5, 5, 5]}
        />
        <Rect
          // key={data.numberOfPegs + index}
          x={pegWidth * index + index * sep}
          y={baseY + 20}
          width={pegWidth}
          height={10}
          fill="black"
          shadowBlur={hoveredPeg === index ? 20 : 0}
          shadowOpacity={hoveredPeg === index ? 0.6 : 0}
          shadowOffsetX={0}
          shadowOffsetY={0}
          cornerRadius={[5, 5, 5, 5]}
        />
      </Group>
    );
  });
const DiskElements = ({
  data,
  handleDiskDragStart,
  handleDiskDragEnd,
  handleDiskHover,
  handleDiskUnhover,
  calculateDiskWidth,
  draggableDisks,
}) =>
  data !== null &&
  data.pegs.flat().map((disk, index) => {
    const pegIndex = data.pegs.findIndex((peg) => peg.includes(disk));
    const diskIndexInPeg = data.pegs[pegIndex].indexOf(disk);
    const x =
      pegWidth * pegIndex +
      pegWidth / 2 -
      calculateDiskWidth(disk % 10) / 2 +
      pegIndex * sep;
    const y = baseY - diskIndexInPeg * diskHeight;

    // console.log("New Render", x, y);
    return (
      <Rect
        onMouseEnter={(e) => {
          document.body.style.cursor = "pointer";
          handleDiskHover(e);
        }}
        onMouseLeave={(e) => {
          document.body.style.cursor = "default";
          handleDiskUnhover(e);
        }}
        key={index}
        x={x}
        y={y}
        width={calculateDiskWidth(disk % 10)}
        height={diskHeight}
        fill={colors[disk % 10]}
        draggable={draggableDisks.includes(disk)}
        onDragStart={(e) => handleDiskDragStart(e, index)}
        onDragEnd={(e) => handleDiskDragEnd(e, pegIndex)}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={0}
        shadowOffsetY={0}
        disk={disk}
        pegIndex={pegIndex}
        strokeEnabled={true}
        opacity={0.95}
        cornerRadius={[10, 10, 10, 10]}
      />
    );
  });

const CustomDisk = ({
  data,
  extraDisk,
  setExtraDisk,
  handleDiskDragStart,
  handleDiskDragEnd,
  handleDiskHover,
  handleDiskUnhover,
  calculateDiskWidth,
}) => {
  return (
    <>
      <Line
        points={[0, 260, 20 + pegWidth * data.numberOfPegs, 260]}
        stroke={"rgb(236, 72, 153)"}
        strokeWidth={1}
      />
      <KonvaButton
        text="<"
        x={pegWidth - 15}
        y={270}
        onClick={() =>
          extraDisk > -1 ? setExtraDisk((prev) => prev - 1) : setExtraDisk(9)
        }
      />
      {extraDisk !== -1 ? (
        <Rect
          onMouseEnter={(e) => {
            document.body.style.cursor = "pointer";
            handleDiskHover(e);
          }}
          onMouseLeave={(e) => {
            document.body.style.cursor = "default";
            handleDiskUnhover(e);
          }}
          key={-1}
          x={
            pegWidth * 1 +
            pegWidth / 2 -
            calculateDiskWidth(extraDisk) / 2 +
            1 * sep
          }
          y={275}
          width={calculateDiskWidth(extraDisk)}
          height={diskHeight}
          fill={colors[extraDisk]}
          draggable={true}
          onDragStart={(e) => handleDiskDragStart(e, -1)}
          onDragEnd={(e) => handleDiskDragEnd(e, -1)}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          shadowOffsetX={0}
          shadowOffsetY={0}
          disk={extraDisk}
          pegIndex={-1}
          isExtra={true}
          strokeEnabled={true}
          opacity={0.9}
          cornerRadius={[10, 10, 10, 10]}
        />
      ) : (
        <></>
      )}

      <KonvaButton
        text=">"
        x={2 * pegWidth + 15}
        y={270}
        onClick={() =>
          extraDisk < 9 ? setExtraDisk(extraDisk + 1) : setExtraDisk(-1)
        }
      />
    </>
  );
};
const TowerOfHanoi = (props, ref) => {
  const [data, setData] = [props.input, props.setInput];
  // const setData = props.setInput;

  const [draggableDisks, setDraggableDisks] = useState([]);
  const [hoveredPeg, setHoveredPeg] = useState(null);
  const [isProblemSetting, setIsProblemSetting] = useState(
    cookie.get("type") != 0
  );

  // const [history, setHistory]
  // start: 0, end: 1;
  const [scaleX, setScaleX] = useState(window.innerWidth / 900);
  const [scaleY, setScaleY] = useState(window.innerWidth / 800);

  const [extraDisk, setExtraDisk] = useState(0);
  const [history, setHistory] = useState([]);
  const [currentHistory, setCurrentHistory] = useState(-1);

  const setNumberOfDisks = (n) => {
    setData((prevData) => {
      return { ...prevData, numberOfDisks: n };
    });
  };
  const setNumberOfPegs = (n) => {
    setData((prevData) => {
      return { ...prevData, numberOfPegs: n };
    });
  };
  const setPegs = (p) => {
    setData((prevData) => {
      return { ...prevData, pegs: p };
    });
  };
  const setNumberOfMoves = (n) => {
    setData((prevData) => {
      return { ...prevData, numberOfMoves: n };
    });
  };

  useImperativeHandle(ref, () => {
    return {
      handleReset: () => handleReset(),
      // getData: () => exportData(),
    };
  });

  const handleReset = (e) => {
    if (props.input != null && props.input.pegs != null) {
      setNumberOfMoves(0);
      importData();
    } else {
      setNumberOfDisks(3);
      initializePegs(3, 3);
    }
    // setHistory([]);
    setCurrentHistory(-1);
  };

  useEffect(() => {
    console.log("=>", data);
  }, [data]);

  useEffect(() => {
    console.log(history);
  }, [history]);
  const importData = () => {
    if (props.input != null && props.input.pegs != null) {
      const list = props.input.pegs.map((peg) => peg[peg.length - 1]);
      setDraggableDisks(list);
    } else {
      setNumberOfDisks(3);
      setNumberOfPegs(3);
      initializePegs(3, 3);
    }
  };

  const handleDiskHover = (e) => {
    if (
      draggableDisks.includes(e.target.attrs.disk) ||
      e.target.attrs.isExtra
    ) {
      e.target.to({
        opacity: 0.7,
        strokeWidth: 3,
        stroke: "black",
        duration: 0.4,
      });
    }
  };

  const handleDiskDrag = (e) => {
    const diskValue = e.target.attrs.disk;
    const sourceX = e.target.x();
    const sourceY = e.target.y();

    let nearestPegIndex = -1;
    let minDistance = Infinity;

    if (isProblemSetting && sourceY > 250) setHoveredPeg(null);
    else {
      data.pegs.forEach((peg, index) => {
        const pegX =
          index * pegWidth +
          pegWidth / 2 -
          calculateDiskWidth(diskValue % 10) / 2;
        const distance = Math.abs(sourceX - pegX);

        if (distance < minDistance) {
          nearestPegIndex = index;
          minDistance = distance;
        }
      });
      setHoveredPeg(nearestPegIndex);
    }
  };

  const handleDiskUnhover = (e) => {
    if (
      draggableDisks.includes(e.target.attrs.disk) ||
      e.target.attrs.isExtra
    ) {
      e.target.to({
        opacity: 0.9,
        duration: 0.4,
        strokeWidth: 0,
        stroke: "black",
      });
    }
    setHoveredPeg(null);
  };

  useEffect(() => {
    if (props.input != null && props.input.pegs != null) {
      setNumberOfMoves(0);
      importData();
      setLoading(false);
    } else {
      setNumberOfDisks(3);
      setNumberOfPegs(3);
      initializePegs(3, 3);
      setLoading(false);
    }
  }, []);

  const initializePegs = (nDisks, nPegs) => {
    setNumberOfMoves(0);
    const initialPegs = [Array.from({ length: nDisks }, (_, i) => i)];
    for (let i = 1; i < nPegs; i++) {
      initialPegs.push([]);
    }

    setPegs(initialPegs);
    setDraggableDisks([
      initialPegs[0][initialPegs[0][initialPegs[0].length - 1]],
    ]);
  };
  const calculateDiskWidth = (disk) => pegWidth - diskWidthFactor * disk;

  // Handle the start of disk drag
  const handleDiskDragStart = (e, sourcePegIndex) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 10,
        y: 10,
      },
    });
  };

  const findSmallestNumberNotInArray = (array, n) => {
    for (let x = n; ; x += 10) {
      // Check if x is present in the array
      let isPresent = false;
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          if (array[i][j] === x) {
            isPresent = true;
            break;
          }
        }
        if (isPresent) {
          break;
        }
      }

      // If x is not present, return it
      if (!isPresent) {
        return x;
      }
    }
  };

  const handleDiskDragEnd = (e, pegIndex) => {
    let diskValue = e.target.attrs.disk;
    const isExtra = e.target.attrs.disk;
    const sourceX = e.target.x();
    const sourceY = e.target.y();
    const sourcePegIndex = pegIndex;

    let nearestPegIndex = sourcePegIndex;
    let minDistance = Infinity;

    if (isProblemSetting && sourceY > 250) {
      // Delete
      if (currentHistory < history.length - 1) {
        setHistory((prevArray) => [...prevArray.slice(0, currentHistory + 1)]);
      }

      setCurrentHistory(currentHistory + 1);
      setHistory((prevArray) => [
        ...prevArray,
        { start: sourcePegIndex, end: -1, diskValue: diskValue },
      ]);
      const updatedDraggable = [...draggableDisks];
      const updatedPegs = [...data.pegs];

      if (sourcePegIndex !== -1) {
        var index = updatedPegs[sourcePegIndex].indexOf(diskValue);
        if (index !== -1) {
          updatedPegs[sourcePegIndex].splice(index, 1);
        }
        updatedDraggable.push(
          updatedPegs[sourcePegIndex][updatedPegs[sourcePegIndex].length - 1]
        );
      }

      setPegs(updatedPegs);
      setDraggableDisks(updatedDraggable);
      setExtraDisk(diskValue % 10);
      if (sourcePegIndex !== -1) {
        setNumberOfDisks(data.numberOfDisks - 1);
      }
      e.target.to({
        x:
          pegWidth * 1 +
          pegWidth / 2 -
          calculateDiskWidth(diskValue % 10) / 2 +
          1 * sep,
        y: 275,
        duration: 0.2,
        sourcePegIndex: -1,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      });
    } else {
      data.pegs.forEach((peg, index) => {
        const pegX =
          index * pegWidth +
          pegWidth / 2 -
          calculateDiskWidth(diskValue % 10) / 2;
        const distance = Math.abs(sourceX - pegX);

        if (distance < minDistance) {
          nearestPegIndex = index;
          minDistance = distance;
        }
      });

      if (sourcePegIndex === -1) {
        // New one
        if (
          data.pegs[nearestPegIndex].length < 10 &&
          (data.pegs[nearestPegIndex].length === 0 ||
            data.pegs[nearestPegIndex][data.pegs[nearestPegIndex].length - 1] %
              10 <=
              diskValue % 10)
        ) {
          if (currentHistory < history.length - 1) {
            setHistory((prevArray) => [
              ...prevArray.slice(0, currentHistory + 1),
            ]);
          }

          setCurrentHistory(currentHistory + 1);
          setHistory((prevArray) => [
            ...prevArray,
            {
              start: sourcePegIndex,
              end: nearestPegIndex,
              diskValue: diskValue,
            },
          ]);
          const updatedDraggable = [...draggableDisks];
          const updatedPegs = [...data.pegs];
          // Find a free value % 10 = diskValue
          diskValue = findSmallestNumberNotInArray(data.pegs, diskValue % 10);
          updatedPegs[nearestPegIndex].push(diskValue);

          if (data.pegs[nearestPegIndex].length > 1) {
            var index2 = updatedDraggable.indexOf(
              updatedPegs[nearestPegIndex][
                updatedPegs[nearestPegIndex].length - 2
              ]
            );
            if (index2 !== -1) {
              updatedDraggable.splice(index2, 1);
            } else {
              console.log("Not found");
            }
          }

          updatedDraggable.push(diskValue);

          const diskIndexInPeg =
            updatedPegs[nearestPegIndex].indexOf(diskValue);
          setPegs(updatedPegs);
          setDraggableDisks(updatedDraggable);
          setNumberOfMoves(data.numberOfMoves + 1);
          setExtraDisk(-1);
          console.log("Increase Disks");
          setNumberOfDisks(data.numberOfDisks + 1);
          e.target.to({
            x:
              (pegWidth + sep) * nearestPegIndex +
              pegWidth / 2 -
              calculateDiskWidth(e.target.attrs.disk % 10) / 2,
            y: baseY - diskIndexInPeg * diskHeight,
            duration: 0.2,
          });
        } else {
          e.target.to({
            x:
              pegWidth * 1 +
              pegWidth / 2 -
              calculateDiskWidth(diskValue % 10) / 2 +
              1 * sep,
            y: 275,
            duration: 0.2,
            sourcePegIndex: -1,
          });
        }
      } else if (
        sourcePegIndex !== nearestPegIndex &&
        (data.pegs[nearestPegIndex].length === 0 ||
          data.pegs[nearestPegIndex][data.pegs[nearestPegIndex].length - 1] %
            10 <=
            diskValue % 10) &&
        data.pegs[nearestPegIndex].length < 10
      ) {
        // Transfer
        console.log("History:", history);
        if (currentHistory < history.length - 1) {
          setHistory((prevArray) => [
            ...prevArray.slice(0, currentHistory + 1),
          ]);
        }
        setCurrentHistory(currentHistory + 1);

        setHistory((prevArray) => [
          ...prevArray,
          { start: sourcePegIndex, end: nearestPegIndex, diskValue: diskValue },
        ]);

        const updatedDraggable = [...draggableDisks];
        const updatedPegs = [...data.pegs];
        updatedPegs[nearestPegIndex].push(diskValue);

        var index = updatedPegs[sourcePegIndex].indexOf(diskValue);
        if (index !== -1) {
          updatedPegs[sourcePegIndex].splice(index, 1);
        }

        if (data.pegs[nearestPegIndex].length > 1) {
          var index2 = updatedDraggable.indexOf(
            updatedPegs[nearestPegIndex][
              updatedPegs[nearestPegIndex].length - 2
            ]
          );
          if (index2 !== -1) {
            updatedDraggable.splice(index2, 1);
          } else {
            console.log("Not found");
          }
        }

        updatedDraggable.push(
          updatedPegs[sourcePegIndex][updatedPegs[sourcePegIndex].length - 1]
        );

        const diskIndexInPeg = updatedPegs[nearestPegIndex].indexOf(diskValue);

        e.target.to({
          x:
            (pegWidth + sep) * nearestPegIndex +
            pegWidth / 2 -
            calculateDiskWidth(e.target.attrs.disk % 10) / 2,
          y: baseY - diskIndexInPeg * diskHeight,
          duration: 0.2,
        });

        setPegs(updatedPegs);
        setDraggableDisks(updatedDraggable);
        setNumberOfMoves(data.numberOfMoves + 1);
      } else {
        const diskIndexInPeg = data.pegs[sourcePegIndex].indexOf(diskValue);
        setPegs([...data.pegs]);
        e.target.to({
          x:
            (pegWidth + sep) * sourcePegIndex +
            pegWidth / 2 -
            calculateDiskWidth(e.target.attrs.disk % 10) / 2,
          y: baseY - diskIndexInPeg * diskHeight,
          duration: 0.2,
        });
      }

      e.target.to({
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        duration: 0.1,
      });
    }
    setHoveredPeg(null);
  };

  const applyMove = (move, dir) => {
    const sourcePegIndex = dir > 0 ? move.start : move.end;
    const nearestPegIndex = dir > 0 ? move.end : move.start;
    if (sourcePegIndex !== -1 && nearestPegIndex !== -1) {
      const diskValue =
        data.pegs[sourcePegIndex][data.pegs[sourcePegIndex].length - 1];
      const updatedDraggable = [...draggableDisks];
      const updatedPegs = [...data.pegs];
      updatedPegs[nearestPegIndex].push(diskValue);

      var index = updatedPegs[sourcePegIndex].indexOf(diskValue);
      if (index !== -1) {
        updatedPegs[sourcePegIndex].splice(index, 1);
      }

      if (data.pegs[nearestPegIndex].length > 1) {
        var index2 = updatedDraggable.indexOf(
          updatedPegs[nearestPegIndex][updatedPegs[nearestPegIndex].length - 2]
        );
        if (index2 !== -1) {
          updatedDraggable.splice(index2, 1);
        } else {
          console.log("Not found");
        }
      }

      updatedDraggable.push(
        updatedPegs[sourcePegIndex][updatedPegs[sourcePegIndex].length - 1]
      );

      // const diskIndexInPeg = updatedPegs[nearestPegIndex].indexOf(diskValue);

      // e.target.to({
      //   x:
      //     (pegWidth + sep) * nearestPegIndex +
      //     pegWidth / 2 -
      //     calculateDiskWidth(e.target.attrs.disk % 10) / 2,
      //   y: baseY - diskIndexInPeg * diskHeight,
      //   duration: 0.2,
      // });

      setPegs(updatedPegs);
      setDraggableDisks(updatedDraggable);
      setNumberOfMoves(data.numberOfMoves + dir);
    } else if (sourcePegIndex !== -1) {
      const updatedDraggable = [...draggableDisks];
      const updatedPegs = [...data.pegs];
      const diskValue =
        data.pegs[sourcePegIndex][data.pegs[sourcePegIndex].length - 1];

      var index = updatedPegs[sourcePegIndex].indexOf(diskValue);
      if (index !== -1) {
        updatedPegs[sourcePegIndex].splice(index, 1);
      }
      updatedDraggable.push(
        updatedPegs[sourcePegIndex][updatedPegs[sourcePegIndex].length - 1]
      );

      setPegs(updatedPegs);
      setDraggableDisks(updatedDraggable);
      setExtraDisk(diskValue % 10);
      if (sourcePegIndex !== -1) {
        setNumberOfDisks(data.numberOfDisks - 1);
      }
    } else {
      const updatedDraggable = [...draggableDisks];
      const updatedPegs = [...data.pegs];
      let diskValue = move.diskValue;
      // Find a free value % 10 = diskValue
      diskValue = findSmallestNumberNotInArray(data.pegs, diskValue % 10);
      updatedPegs[nearestPegIndex].push(diskValue);

      if (data.pegs[nearestPegIndex].length > 1) {
        var index2 = updatedDraggable.indexOf(
          updatedPegs[nearestPegIndex][updatedPegs[nearestPegIndex].length - 2]
        );
        if (index2 !== -1) {
          updatedDraggable.splice(index2, 1);
        } else {
          console.log("Not found");
        }
      }

      updatedDraggable.push(diskValue);

      // const diskIndexInPeg = updatedPegs[nearestPegIndex].indexOf(diskValue);
      setPegs(updatedPegs);
      setDraggableDisks(updatedDraggable);
      setNumberOfMoves(data.numberOfMoves + dir);
      // setExtraDisk(-1);
      setNumberOfDisks(data.numberOfDisks + 1);
      // e.target.to({
      //   x:
      //     (pegWidth + sep) * nearestPegIndex +
      //     pegWidth / 2 -
      //     calculateDiskWidth(e.target.attrs.disk % 10) / 2,
      //   y: baseY - diskIndexInPeg * diskHeight,
      //   duration: 0.2,
      // });
    }
  };

  const handleRedo = () => {
    if (history.length - 1 === currentHistory) {
      return;
    }

    const next = history[currentHistory + 1];
    applyMove(next, +1);
    setCurrentHistory(currentHistory + 1);
  };
  const handleUndo = () => {
    if (currentHistory === -1) {
      return;
    }
    const previous = history[currentHistory];
    // setHistory((prevArray) => [...prevArray.slice(0, -1)]);
    setCurrentHistory(currentHistory - 1);
    applyMove(previous, -1);
  };

  const handleNumberOfDisksChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setNumberOfDisks(value);
      initializePegs(value, data.numberOfPegs);
    }
  };

  // const handleNumberOfPegsChange = (event) => {
  //   const value = parseInt(event.target.value, 10);
  //   if (!isNaN(value) && value >= 1 && value <= 5) {
  //     setNumberOfPegs(value);
  //   }
  // };

  return (
    <div className="tower-of-hanoi vbox">
      {data && (
        <>
          <div className="toh-header hbox">
            {(props.mode === "edit" || props.uiParams.undo.value) && (
              <UndoRedoButton handleUndo={handleUndo} handleRedo={handleRedo} />
            )}
            <div className="flex flex-row flex-start w-full gap-5 min-h-[2.5rem] ">
              {(props.mode === "edit" || props.uiParams.n_disks.value) && (
                <NumberOfDisksInput
                  data={data}
                  handleNumberOfDisksChange={handleNumberOfDisksChange}
                />
              )}
              {props.mode === "preview" && props.uiParams.moves.value && (
                <Typography variant="h5" className="p-0 m-0 bu-text-primary">
                  <b className="bu-text-primary">Moves: {data.numberOfMoves}</b>
                </Typography>
              )}
            </div>
          </div>
          <Divider sx={{ bgcolor: "rgb(236, 72, 153)" }} />
          <div className={`toh-canvas vbox flex-center`}>
            <Stage
              x={20}
              width={
                Math.min(window.innerWidth / 900, 1) *
                (60 + pegWidth * data.numberOfPegs)
              }
              height={
                Math.min(window.innerWidth / 800, 1) *
                (280 +
                  (props.mode === "edit" || props.uiParams.custom_disk.value
                    ? diskHeight * 1.2
                    : 0))
              }
              scaleX={Math.min(window.innerWidth / 970, 1)}
              scaleY={Math.min(window.innerWidth / 900, 1)}
            >
              <Layer onDragMove={(e) => handleDiskDrag(e)}>
                <PegElements data={data} hoveredPeg={hoveredPeg} />
                <DiskElements
                  data={data}
                  handleDiskDragStart={handleDiskDragStart}
                  handleDiskDragEnd={handleDiskDragEnd}
                  handleDiskHover={handleDiskHover}
                  handleDiskUnhover={handleDiskUnhover}
                  calculateDiskWidth={calculateDiskWidth}
                  draggableDisks={draggableDisks}
                />
                {(props.mode === "edit" ||
                  props.uiParams.custom_disk.value) && (
                  <CustomDisk
                    data={data}
                    extraDisk={extraDisk}
                    setExtraDisk={setExtraDisk}
                    handleDiskDragStart={handleDiskDragStart}
                    handleDiskDragEnd={handleDiskDragEnd}
                    handleDiskHover={handleDiskHover}
                    handleDiskUnhover={handleDiskUnhover}
                    calculateDiskWidth={calculateDiskWidth}
                  />
                )}
              </Layer>
            </Stage>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(forwardRef(TowerOfHanoi));
