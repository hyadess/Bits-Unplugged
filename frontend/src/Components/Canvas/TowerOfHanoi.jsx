import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Label } from "react-konva";

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
const TowerOfHanoi = (props) => {
  const [numberOfDisks, setNumberOfDisks] = useState(3);
  const [numberOfPegs, setNumberOfPegs] = useState(3);
  const [pegs, setPegs] = useState([]);
  const [draggableDisks, setDraggableDisks] = useState([]);
  const [hoveredPeg, setHoveredPeg] = useState(null);
  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [isProblemSetting, setIsProblemSetting] = useState(
    cookie.get("type") != 0
  );
  const pegWidth = 200;
  const diskHeight = 20;
  const diskWidthFactor = 18;
  const baseY = 220;
  const sep = 10;
  // const [history, setHistory] = useState([]);

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
    // storing object in input..........
    props.setInput(data);
  };

  const importData = () => {
    if (props.input != null && props.input.pegs != null) {
      // setNumberOfMoves(0);
      const data = props.input;
      console.log("importing");
      setPegs(data.pegs);
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
    if (draggableDisks.includes(e.target.attrs.disk)) {
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
      const data = props.input;
      console.log("importing");
      console.log(data.pegs);
      setPegs(data.pegs);
      setNumberOfDisks(data.numberOfDisks);
      setNumberOfPegs(data.numberOfPegs);
      const list = data.pegs.map((peg) => peg[peg.length - 1]);
      setDraggableDisks(list);
    } else {
      initializePegs(numberOfPegs);
    }
  };
  const handleDiskDrag = (e) => {
    const diskValue = e.target.attrs.disk;
    const sourceX = e.target.x();

    let nearestPegIndex = -1;
    let minDistance = Infinity;

    pegs.forEach((peg, index) => {
      const pegX =
        index * pegWidth + pegWidth / 2 - calculateDiskWidth(diskValue) / 2;
      const distance = Math.abs(sourceX - pegX);

      if (distance < minDistance) {
        nearestPegIndex = index;
        minDistance = distance;
      }
    });
    setHoveredPeg(nearestPegIndex);
  };

  const handleDiskUnhover = (e) => {
    if (draggableDisks.includes(e.target.attrs.disk)) {
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

  const handleDiskDragEnd = (e, pegIndex) => {
    const diskValue = e.target.attrs.disk;
    const sourceX = e.target.x();
    const sourcePegIndex = pegIndex;

    let nearestPegIndex = sourcePegIndex;
    let minDistance = Infinity;

    pegs.forEach((peg, index) => {
      const pegX =
        index * pegWidth + pegWidth / 2 - calculateDiskWidth(diskValue) / 2;
      const distance = Math.abs(sourceX - pegX);

      if (distance < minDistance) {
        nearestPegIndex = index;
        minDistance = distance;
      }
    });

    // console.log(pegs[nearestPegIndex][0], diskValue);
    if (
      sourcePegIndex !== nearestPegIndex &&
      (pegs[nearestPegIndex].length === 0 ||
        pegs[nearestPegIndex][pegs[nearestPegIndex].length - 1] <= diskValue)
    ) {
      const updatedDraggable = [...draggableDisks];
      const updatedPegs = [...pegs];

      updatedPegs[nearestPegIndex].push(diskValue);
      var index = updatedPegs[sourcePegIndex].indexOf(diskValue);
      if (index !== -1) {
        updatedPegs[sourcePegIndex].splice(index, 1);
      }

      console.log(updatedPegs);
      console.log(updatedPegs[nearestPegIndex].length, nearestPegIndex);
      if (pegs[nearestPegIndex].length > 1) {
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
      const diskIndexInPeg = updatedPegs[nearestPegIndex].indexOf(diskValue);

      e.target.to({
        x:
          (pegWidth + sep) * nearestPegIndex +
          pegWidth / 2 -
          calculateDiskWidth(e.target.attrs.disk) / 2,
        y: baseY - diskIndexInPeg * diskHeight,
        duration: 0.2,
      });

      setPegs(updatedPegs);
      setDraggableDisks(updatedDraggable);
      // console.log(updatedPegs);
      // const arr = history;
      // const new_pegs = updatedPegs;
      // arr.push(new_pegs);
      // setHistory(arr);
      // console.log(arr);

      setNumberOfMoves(numberOfMoves + 1);
    } else {
      const diskIndexInPeg = pegs[sourcePegIndex].indexOf(diskValue);
      setPegs([...pegs]);
      e.target.to({
        x:
          (pegWidth + sep) * sourcePegIndex +
          pegWidth / 2 -
          calculateDiskWidth(e.target.attrs.disk) / 2,
        y: baseY - diskIndexInPeg * diskHeight,
        duration: 0.2,
      });
    }

    e.target.to({
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      duration: 0.1,
    });
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
      calculateDiskWidth(disk) / 2 +
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
        width={calculateDiskWidth(disk)}
        height={diskHeight}
        fill={colors[disk]}
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

  return (
    <div className="tower-of-hanoi vbox">
      <div className="toh-header hbox">
        <div className="flex-center">
          {isProblemSetting ? (
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment" sx={{ color: "white" }}>
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
          ) : (
            <></>
          )}
        </div>

        <div
          className="hbox"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="" onClick={exportData}>
            <SaveIcon sx={{ fontSize: "2rem", color: "white" }} />
          </Button>

          <Button variant="" onClick={handleReset}>
            <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
          </Button>

          <Typography variant="h5" className="p-0 m-0" color={"white"}>
            <b>Moves: {numberOfMoves}</b>
          </Typography>
        </div>
      </div>
      <Divider sx={{ bgcolor: "rgb(236, 72, 153)" }} />
      <div className={`toh-canvas vbox flex-center`}>
        <Stage x={20} width={60 + pegWidth * numberOfPegs} height={280}>
          <Layer onDragMove={(e) => handleDiskDrag(e)}>
            {pegElements}
            {diskElements}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default TowerOfHanoi;
