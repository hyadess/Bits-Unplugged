import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Stage, Layer, Rect, Label, Text, Tag, Line } from "react-konva";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { InputAdornment, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import SaveIcon from "@mui/icons-material/Save";
import Cookies from "universal-cookie";
// import { NumberField } from "../InputFields/inputField";
import "./TowerOfHanoi.scss";
// import "bootstrap/dist/css/bootstrap.min.css";

const cookie = new Cookies();
const TowerOfHanoi = (props, ref) => {
  const [numberOfDisks, setNumberOfDisks] = useState(3);
  const [numberOfPegs, setNumberOfPegs] = useState(3);
  const [pegs, setPegs] = useState([]);
  const [draggableDisks, setDraggableDisks] = useState([]);
  const [hoveredPeg, setHoveredPeg] = useState(null);
  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [isProblemSetting, setIsProblemSetting] = useState(
    cookie.get("type") != 0
  );
  const [scaleX, setScaleX] = useState(window.innerWidth / 900);
  const [scaleY, setScaleY] = useState(window.innerWidth / 800);
  const pegWidth = 200;
  const diskHeight = 20;
  const diskWidthFactor = 18;
  const baseY = 220;
  const sep = 10;
  const [extraDisk, setExtraDisk] = useState(0);
  // const [history, setHistory] = useState([]);
  useImperativeHandle(ref, () => {
    return {
      handleReset: () => handleReset(),
      getData: () => exportData(),
    };
  });

  const exportData = () => {
    const data = {
      numberOfMoves,
      numberOfDisks,
      numberOfPegs,
      pegs,
    };
    // Convert the JavaScript object to a JSON string
    const jsonData = JSON.stringify(data, null, 2);
    console.log("exporting");
    console.log(jsonData);

    return data;
  };

  const importData = () => {
    if (props.input != null && props.input.pegs != null) {
      // setNumberOfMoves(0);
      const data = props.input;
      console.log("importing");
      setPegs(data.pegs.map((subArray) => [...subArray]));
      setNumberOfDisks(data.numberOfDisks);
      setNumberOfPegs(data.numberOfPegs);
      const list = data.pegs.map((peg) => peg[peg.length - 1]);
      setDraggableDisks(list);
    } else {
      setNumberOfDisks(3);
      setNumberOfPegs(3);
      initializePegs(3);
    }
  };

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
  const handleDiskHover = (e) => {
    console.log("Extra:", e.target.attrs);
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

  // Bug
  const handleReset = (e) => {
    if (props.input != null && props.input.pegs != null) {
      setNumberOfMoves(0);
      importData();
    } else {
      setNumberOfDisks(3);
      initializePegs(3);
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
      pegs.forEach((peg, index) => {
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

  // useEffect(() => {
  //   initializePegs();
  // }, [numberOfDisks, numberOfPegs]);

  useEffect(() => {
    if (props.input != null && props.input.pegs != null) {
      importData();
    } else {
      setNumberOfDisks(3);
      setNumberOfPegs(3);
      initializePegs(3);
    }
  }, []);
  useEffect(() => {
    importData();
  }, [props]);

  const initializePegs = (nDisks) => {
    setNumberOfMoves(0);
    const initialPegs = [Array.from({ length: nDisks }, (_, i) => i)];
    for (let i = 1; i < numberOfPegs; i++) {
      initialPegs.push([]);
    }
    setPegs(initialPegs);
    setDraggableDisks([
      initialPegs[0][initialPegs[0][initialPegs[0].length - 1]],
    ]);
    // setNumberOfDisks(3);
    // const new_pegs = initialPegs;
    // setHistory(Array(new_pegs));
    // console.log([new_pegs], numberOfPegs);
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
      const updatedDraggable = [...draggableDisks];
      const updatedPegs = [...pegs];

      if (sourcePegIndex !== -1) {
        var index = updatedPegs[sourcePegIndex].indexOf(diskValue);
        if (index !== -1) {
          updatedPegs[sourcePegIndex].splice(index, 1);
        }
      }

      if (sourcePegIndex !== -1) {
        updatedDraggable.push(
          updatedPegs[sourcePegIndex][updatedPegs[sourcePegIndex].length - 1]
        );
      }

      setPegs(updatedPegs);
      setDraggableDisks(updatedDraggable);
      setExtraDisk(diskValue % 10);
      if (sourcePegIndex !== -1) {
        setNumberOfDisks(numberOfDisks - 1);
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
      pegs.forEach((peg, index) => {
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
        if (
          pegs[nearestPegIndex].length < 10 &&
          (pegs[nearestPegIndex].length === 0 ||
            pegs[nearestPegIndex][pegs[nearestPegIndex].length - 1] % 10 <=
              diskValue % 10)
        ) {
          const updatedDraggable = [...draggableDisks];
          const updatedPegs = [...pegs];
          // Find a free value % 10 = diskValue
          diskValue = findSmallestNumberNotInArray(pegs, diskValue % 10);
          updatedPegs[nearestPegIndex].push(diskValue);

          if (pegs[nearestPegIndex].length > 1) {
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
          setNumberOfMoves(numberOfMoves + 1);
          setExtraDisk(-1);
          console.log("Increase Disks");
          setNumberOfDisks(numberOfDisks + 1);
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
        (pegs[nearestPegIndex].length === 0 ||
          pegs[nearestPegIndex][pegs[nearestPegIndex].length - 1] % 10 <=
            diskValue % 10) &&
        pegs[nearestPegIndex].length < 10
      ) {
        const updatedDraggable = [...draggableDisks];
        const updatedPegs = [...pegs];
        updatedPegs[nearestPegIndex].push(diskValue);

        var index = updatedPegs[sourcePegIndex].indexOf(diskValue);
        if (index !== -1) {
          updatedPegs[sourcePegIndex].splice(index, 1);
        }

        if (pegs[nearestPegIndex].length > 1) {
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

        setNumberOfMoves(numberOfMoves + 1);
      } else {
        const diskIndexInPeg = pegs[sourcePegIndex].indexOf(diskValue);
        setPegs([...pegs]);
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
  };
  const pegElements = pegs.map((peg, index) => (
    <>
      <Rect
        key={index}
        x={pegWidth / 2 + pegWidth * index - 5 + index * sep}
        y={25}
        width={10}
        height={baseY}
        fill="black"
        shadowBlur={hoveredPeg === index ? 20 : 0}
        shadowOpacity={hoveredPeg === index ? 0.6 : 0}
        shadowOffsetX={0}
        shadowOffsetY={0}
        cornerRadius={[5, 5]}
      />
      <Rect
        key={numberOfPegs + index}
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
    </>
  ));

  // const handleUndo = () => {
  //   if (history.length === 1) {
  //     return;
  //   }
  //   const previous = history[history.length - 1];
  //   this.setPegs(previous);
  // };

  const diskElements = pegs.flat().map((disk, index) => {
    const pegIndex = pegs.findIndex((peg) => peg.includes(disk));
    const diskIndexInPeg = pegs[pegIndex].indexOf(disk);
    const x =
      pegWidth * pegIndex +
      pegWidth / 2 -
      calculateDiskWidth(disk % 10) / 2 +
      pegIndex * sep;
    const y = baseY - diskIndexInPeg * diskHeight;

    console.log("New Render", x, y);
    return (
      <Rect
        onMouseEnter={(e) => handleDiskHover(e)}
        onMouseLeave={(e) => handleDiskUnhover(e)}
        key={disk}
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
        opacity={0.9}
        cornerRadius={[10, 10, 10, 10]}
      />
    );
  });
  useEffect(() => {
    console.log(window.innerWidth);
  });
  const handleNumberOfDisksChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setNumberOfDisks(value);
      initializePegs(value);
    }
  };

  const handleNumberOfPegsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      setNumberOfPegs(value);
    }
  };

  const KonvaButton = (props) => {
    return (
      <Label
        // width={pegWidth}
        // height={5}
        onClick={props.onClick}
        x={props.x}
        y={props.y}
      >
        <Tag
          fill="black"
          lineJoin="round"
          shadowColor="black"
          shadowBlur={10}
          shadowOffset={10}
          shadowOpacity={0.5}
          cornerRadius={10}
          // width={pegWidth}
          // height={5}
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
  return (
    <div className="tower-of-hanoi vbox">
      <div className="toh-header hbox">
        <div className="flex-center">
          {isProblemSetting ? (
            <div className="hbox w-full">
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  htmlFor="outlined-adornment"
                  sx={{ color: "white" }}
                >
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
                  className="outlined-input"
                  type="number"
                  value={numberOfDisks}
                  onChange={handleNumberOfDisksChange}
                  label={"Number of Disks"}
                  // endAdornment={props.endAdornment}
                  size="small"
                  sx={{ input: { color: "white" } }}
                />
              </FormControl>
            </div>
          ) : (
            <Typography variant="h5" className="p-0 m-0" color={"white"}>
              <b>Moves: {numberOfMoves}</b>
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
            (60 + pegWidth * numberOfPegs)
          }
          height={
            Math.min(window.innerWidth / 800, 1) *
            (280 + (isProblemSetting ? diskHeight : 0))
          }
          scaleX={Math.min(window.innerWidth / 970, 1)}
          scaleY={Math.min(window.innerWidth / 900, 1)}
        >
          <Layer onDragMove={(e) => handleDiskDrag(e)}>
            {pegElements}
            {diskElements}
            {isProblemSetting ? (
              <>
                <Line
                  points={[0, 260, 20 + pegWidth * numberOfPegs, 260]}
                  stroke={"rgb(236, 72, 153)"}
                  strokeWidth={1}
                />
                <KonvaButton
                  text="<"
                  x={pegWidth - 15}
                  y={270}
                  onClick={() =>
                    extraDisk > -1
                      ? setExtraDisk(extraDisk - 1)
                      : setExtraDisk(9)
                  }
                />
                {extraDisk !== -1 ? (
                  <Rect
                    onMouseEnter={(e) => handleDiskHover(e)}
                    onMouseLeave={(e) => handleDiskUnhover(e)}
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
                    extraDisk < 9
                      ? setExtraDisk(extraDisk + 1)
                      : setExtraDisk(-1)
                  }
                />
              </>
            ) : (
              <></>
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default React.memo(forwardRef(TowerOfHanoi));
