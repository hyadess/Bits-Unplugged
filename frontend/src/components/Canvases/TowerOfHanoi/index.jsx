import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Stage, Layer } from "react-konva";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Cookies from "universal-cookie";

import "./styles.scss";
import { setLoading } from "../../../App";

import CustomDisk from "./CustomDisk";
import UndoRedoButton from "./UndoRedoButton";
import NumberOfDisksInput from "./NumberOfDisksInput";
import PegElements from "./PegElements";
import DiskElements from "./DiskElements";

const cookie = new Cookies();
const pegWidth = 200;
const diskHeight = 20;
const diskWidthFactor = 18;
const baseY = 220;
const sep = 10;

const TowerOfHanoiView = ({
  data,
  activityData,
  previewOptions,
  mode,
  handleUndo,
  handleRedo,
  numberOfDisks,
  handleNumberOfDisksChange,
  handleDiskDrag,
  hoveredPeg,
  handleDiskDragStart,
  handleDiskDragEnd,
  handleDiskHover,
  handleDiskUnhover,
  draggableDisks,
  calculateDiskWidth,
  extraDisk,
  setExtraDisk,
  stageRef,
}) => {
  return (
    <div className="tower-of-hanoi vbox">
      {data && (
        <>
          <div className="toh-header hbox">
            {(mode === "edit" || previewOptions?.undo?.value) && (
              <UndoRedoButton handleUndo={handleUndo} handleRedo={handleRedo} />
            )}
            <div className="flex-start flex min-h-[2.5rem] w-full flex-row items-center gap-5">
              {(mode === "edit" || previewOptions?.nDisks?.value) &&
                numberOfDisks && (
                  <NumberOfDisksInput
                    numberOfDisks={numberOfDisks}
                    handleNumberOfDisksChange={handleNumberOfDisksChange}
                  />
                )}
              {mode === "preview" && previewOptions?.moves?.value && (
                <Typography variant="h5" className="bu-text-primary m-0 p-0">
                  <b className="bu-text-primary">
                    Moves: {activityData?.numberOfMoves ?? 0}
                  </b>
                </Typography>
              )}
            </div>
          </div>
          {/* <Divider sx={{ bgcolor: "rgb(236, 72, 153)" }} /> */}
          <div className={`toh-canvas vbox flex-center`}>
            <Stage
              x={20}
              width={Math.min(window.innerWidth / 900, 1) * (60 + pegWidth * 3)}
              height={
                Math.min(window.innerWidth / 800, 1) *
                (280 +
                  (mode === "edit" || previewOptions?.customDisk?.value
                    ? diskHeight * 1.2
                    : 0))
              }
              ref={stageRef}
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
                {(mode === "edit" || previewOptions?.customDisk?.value) && (
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
// Design, Solution, Test canvas
const TowerOfHanoi = (props, ref) => {
  // const { state: problem, dispatch } = useProblemContext();
  // const data = problem.canvasData;
  const [data, setData] = [props.input, props.setInput];
  // const setData = props.setInput;
  const [activityData, setActivityData] = [
    props.activityData,
    props.setActivityData,
  ];
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

  const [numberOfDisks, setNumberOfDisks] = useState(null);
  // const setNumberOfDisks = (n) => {
  //   setData((prevData) => {
  //     return { ...prevData, numberOfDisks: n };
  //   });
  // };

  const setNumberOfPegs = (n) => {
    // setData((prevData) => {
    //   return { ...prevData, numberOfPegs: n };
    // });
  };
  const setPegs = (p) => {
    // dispatch((prevData) => ({
    //   type: "UPDATE_CANVAS",
    //   payload: { ...prevData.canvasData, pegs: p },
    // }));
    setData({ pegs: p });
  };
  const setNumberOfMoves = (n) => {
    if (setActivityData !== undefined) {
      if (props.mode === "edit") {
        setActivityData({ numberOfMoves: 0 });
      } else {
        setActivityData({ numberOfMoves: n });
      }
    }
  };

  useImperativeHandle(ref, () => {
    return {
      handleReset: (resetData) => handleReset(resetData),
      // getData: () => exportData(),
    };
  });

  const handleReset = (resetData) => {
    if (resetData != null && resetData.pegs != null) {
      // console.log("handleReset:", resetData);
      importData(resetData);
    } else {
      setNumberOfDisks(3);
      initializePegs(3, 3);
    }
    // setHistory([]);
    setCurrentHistory(-1);
  };

  // useEffect(() => {
  //   // console.log("DEBUG_LOG:", data);
  // }, [data]);

  useEffect(() => {
    // console.log(history);
  }, [history]);
  const importData = (newData) => {
    if (newData != null && newData.pegs != null) {
      const list = newData.pegs.map((peg) => peg[peg.length - 1]);
      setNumberOfMoves(0);
      setDraggableDisks(list);
      setNumberOfDisks(newData.pegs.flat(1).length);
      // console.log("RESEEEEEEEEEEET");
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
      // setNumberOfMoves(0);
      importData(props.input);
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
    // console.log("Init:", data);
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

    if (
      (props.mode === "edit" || props.previewOptions?.customDisk?.value) &&
      sourceY > 250
    ) {
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
        setNumberOfDisks((prev) => prev - 1);
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
              // console.log("Not found");
            }
          }

          updatedDraggable.push(diskValue);

          const diskIndexInPeg =
            updatedPegs[nearestPegIndex].indexOf(diskValue);
          setPegs(updatedPegs);
          setDraggableDisks(updatedDraggable);
          setNumberOfMoves(activityData?.numberOfMoves + 1);
          setExtraDisk(-1);
          // console.log("Increase Disks");
          setNumberOfDisks((prev) => prev + 1);
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
        // console.log("History:", history);
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
            // console.log("Not found");
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
        setNumberOfMoves(activityData?.numberOfMoves + 1);
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
          // console.log("Not found");
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
      setNumberOfMoves(activityData?.numberOfMoves + dir);
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
        setNumberOfDisks((prev) => prev - 1);
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
          // console.log("Not found");
        }
      }

      updatedDraggable.push(diskValue);

      // const diskIndexInPeg = updatedPegs[nearestPegIndex].indexOf(diskValue);
      setPegs(updatedPegs);
      setDraggableDisks(updatedDraggable);
      setNumberOfMoves(activityData?.numberOfMoves + dir);
      // setExtraDisk(-1);
      setNumberOfDisks((prev) => prev + 1);
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
      initializePegs(value, 3);
      setHistory([]);
      setCurrentHistory(-1);
    }
  };

  // const handleNumberOfPegsChange = (event) => {
  //   const value = parseInt(event.target.value, 10);
  //   if (!isNaN(value) && value >= 1 && value <= 5) {
  //     setNumberOfPegs(value);
  //   }
  // };

  useEffect(() => {
    // console.log("mode changed", props.mode);
    if (props.mode === "edit") {
      setNumberOfMoves(0);
    }
  }, [props.mode]);

  return (
    <TowerOfHanoiView
      data={data}
      activityData={activityData}
      previewOptions={props.previewOptions}
      mode={props.mode}
      handleUndo={handleUndo}
      handleRedo={handleRedo}
      numberOfDisks={numberOfDisks}
      handleNumberOfDisksChange={handleNumberOfDisksChange}
      handleDiskDrag={handleDiskDrag}
      hoveredPeg={hoveredPeg}
      handleDiskDragStart={handleDiskDragStart}
      handleDiskDragEnd={handleDiskDragEnd}
      handleDiskHover={handleDiskHover}
      handleDiskUnhover={handleDiskUnhover}
      draggableDisks={draggableDisks}
      calculateDiskWidth={calculateDiskWidth}
      extraDisk={extraDisk}
      setExtraDisk={setExtraDisk}
      stageRef={props.stageRef}
    />
  );
};

export default React.memo(forwardRef(TowerOfHanoi));
