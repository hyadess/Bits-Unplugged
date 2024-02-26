import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Element from "./Element";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faCaretUp,
  faRetweet,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FormControl, InputLabel, OutlinedInput, Tooltip } from "@mui/material";
import { setLoading } from "App";

function DraggableElement({
  element,
  onClick,
  id,
  row,
  col,
  moveCard,
  canDrag,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => ({ row, col }),
    canDrag: () => canDrag, // Only allow dragging when canDrag is true
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (
        !(item.row === row && item.col === col) &&
        monitor.isOver({ shallow: true })
      ) {
        moveCard(item.row, item.col, row, col);
        item.col = col;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="w-full"
    >
      <Element element={element} onClick={onClick} row={row} col={col} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1>Array Component</h1>
    </div>
  );
}

function rotateSubarrayLeft(array, start, end, positions) {
  const subarray = array.slice(start, end + 1);
  const rotatedSubarray = [];
  const n = subarray.length;

  for (let i = 0; i < n; i++) {
    const newIndex = (i + (n - (positions % n))) % n; // Adjust rotation for left rotation
    rotatedSubarray[newIndex] = subarray[i];
  }

  for (let i = start, j = 0; i <= end; i++, j++) {
    array[i] = rotatedSubarray[j];
  }

  return array;
}

function rotateSubarray(array, start, end, positions) {
  const subarray = array.slice(start, end + 1);
  const rotatedSubarray = [];
  const n = subarray.length;

  for (let i = 0; i < n; i++) {
    const newIndex = (i + positions) % n;
    rotatedSubarray[newIndex] = subarray[i];
  }

  for (let i = start, j = 0; i <= end; i++, j++) {
    array[i] = rotatedSubarray[j];
  }

  return array;
}

const ArrayComponent = (props, ref) => {
  const [numberOfRows, setNumberOfRows] = useState(1);
  const [numberOfColumns, setNumberOfColumns] = useState(10);

  // const [array, setArray] = useState([]);

  const [data, setData] = [props.input, props.setInput];
  useImperativeHandle(ref, () => {
    return {
      handleReset: (resetData) => handleReset(resetData),
      // getData: () => exportData(),
    };
  });

  useEffect(() => {
    const canvas = props.stageRef.current;

    const handleClick = (e) => {
      if (e.target === canvas) {
        // Clear selection here
        // Iterate over selectedElements and set selected to false
        setData((prevState) => {
          const newArray = [...prevState.array];
          // console.log()
          prevState?.selectedElements.forEach((element) => {
            const pos = getRowCol(element, newArray);
            newArray[pos.row][pos.col].selected = false;
          });
          return { array: newArray, selectedElements: [] };
        });
      }
    };

    canvas.addEventListener("click", handleClick);

    // Clean up event listener on component unmount
    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  const setSelectedElements = (elements) => {
    setData({
      selectedElements: elements,
    });
  };
  const handleReset = (resetData) => {
    if (resetData != null && resetData.array != null) {
      setNumberOfRows(resetData.array.length);
      setNumberOfColumns(resetData.array[0]?.length ?? 1);
      console.log(resetData);
      // console.log("handleReset:", resetData);
      // importData(resetData);
    } else {
      setNumberOfRows(1);
      setNumberOfColumns(10);
      // setArray([
      //   Array.from({ length: 10 }, (_, i) => ({
      //     label: String(i),
      //     selected: false,
      //   })),
      // ]);
      setSelectedElements([]);
      setData({
        array: [
          Array.from({ length: 10 }, (_, i) => ({
            label: String(i),
            selected: false,
            key: i,
          })),
        ],
      });
    }
    // setHistory([]);
    // setCurrentHistory(-1);
  };

  useEffect(() => {
    if (props.input != null && props.input.array != null) {
      setNumberOfRows(data.array.length);
      setNumberOfColumns(data.array[0]?.length ?? 0);
      // setNumberOfMoves(0);
      // importData(props.input);
      setLoading(false);
    } else {
      setNumberOfRows(1);
      setNumberOfColumns(10);
      // setArray([
      //   Array.from({ length: 10 }, (_, i) => ({
      //     label: String(i),
      //     selected: false,
      //   })),
      // ]);
      setSelectedElements([]);
      setData({
        array: [
          Array.from({ length: 10 }, (_, i) => ({
            label: String(i),
            selected: false,
            key: i,
          })),
        ],
      });
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   if (data && JSON.stringify(data.array) !== JSON.stringify(array)) {
  //     // console.log("Data:", data);

  //     setNumberOfRows(data.array.length);
  //     setNumberOfColumns(data.array[0]?.length ?? 0);
  //     // setArray(JSON.parse(JSON.stringify(data.array)));
  //     // console.log(
  //     //   "Data changed:",
  //     //   "Data.array: " + JSON.stringify(data.array),
  //     //   "array: " + JSON.stringify(array)
  //     // );
  //     setSelectedElements([]);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (data && JSON.stringify(data.array) !== JSON.stringify(array)) {
  //     // setData({
  //     //   array: JSON.parse(JSON.stringify(array)),
  //     // });
  //     // console.log(
  //     //   "Array Changed:",
  //     //   "Data.array: " + JSON.stringify(data.array),
  //     //   "array: " + JSON.stringify(array)
  //     // );
  //   }
  // }, [array]);

  const moveCard = (dragRow, dragCol, hoverRow, hoverCol) => {
    setData((prevState) => {
      // console.log(prevState);
      const dragCard = prevState.array[dragRow][dragCol];
      const copiedArray = [...prevState.array];
      const copiedStateArray = [...prevState.array[dragRow]];
      copiedStateArray.splice(dragCol, 1);
      copiedStateArray.splice(hoverCol, 0, dragCard);
      // if (props.mode === "edit") {
      // } else {
      //   copiedStateArray.splice(
      //     Math.max(
      //       dragCol - props.previewOptions.drag.value,
      //       Math.min(dragCol + props.previewOptions.drag.value, hoverCol)
      //     ),
      //     0,
      //     dragCard
      //   );
      // }

      copiedArray[dragRow] = copiedStateArray;
      return { array: copiedArray };
    });
  };

  const canDrag = (col1, col2) => {
    return true;
  };
  const canSwap = (id1, id2) => {
    const pos1 = getRowCol(id1, data.array);
    const pos2 = getRowCol(id2, data.array);

    if (pos1.row === pos2.row) {
      if (Math.abs(pos1.col - pos2.col) <= props?.previewOptions?.swap.value) {
        return true;
      }
    }
    return false;
  };
  const canRotate = (id1, id2) => {
    const pos1 = getRowCol(id1, data.array);
    const pos2 = getRowCol(id2, data.array);

    if (pos1.row === pos2.row) {
      if (
        Math.abs(pos1.col - pos2.col) <= props?.previewOptions?.rotate.value
      ) {
        return true;
      }
    }
    return false;
  };
  const canReverse = (id1, id2) => {
    const pos1 = getRowCol(id1, data.array);
    const pos2 = getRowCol(id2, data.array);

    if (pos1.row === pos2.row) {
      if (
        Math.abs(pos1.col - pos2.col) <= props?.previewOptions?.reverse.value
      ) {
        return true;
      }
    }
    return false;
  };
  const canSort = (id1, id2) => {
    const pos1 = getRowCol(id1, data.array);
    const pos2 = getRowCol(id2, data.array);

    if (pos1.row === pos2.row) {
      if (Math.abs(pos1.col - pos2.col) <= props?.previewOptions?.sort.value) {
        return true;
      }
    }
    return false;
  };

  const getRowCol = (id, array) => {
    console.log("GET:", id, array);
    const row = Math.floor(id / 10);
    const col = array[row].findIndex((element) => element.key === id);
    return { row, col };
  };

  return (
    <div className="min-h-[32rem] flex flex-col">
      <div className="flex flex-row gap-3 p-5 h-20 items-center w-[47rem]">
        {props.mode === "edit" && (
          <div className="flex flex-row gap-3 h-20 items-center">
            <input
              type="number"
              className="border sm:text-sm rounded-lg block p-2.5 bu-input-primary w-16"
              value={numberOfRows}
              placeholder="rows"
              step={1}
              min={1}
              max={10}
              onChange={(e) => {
                let nRows = e.target.value;
                let nCols = numberOfColumns;
                setNumberOfRows(e.target.value);
                // increase size of data.array
                const newArray = [...data.array];
                if (newArray.length < nRows) {
                  for (let i = newArray.length; i < nRows; i++) {
                    newArray.push(
                      Array.from({ length: nCols }, (_, i) => ({
                        label: (nRows - 1) * 10 + i,
                        selected: false,
                        key: (nRows - 1) * 10 + i,
                      }))
                    );
                  }
                } else if (newArray.length > nRows) {
                  newArray.pop();
                }
                setData({ array: newArray });
              }}
            />
            <div className="bu-text-primary text-2xl">
              <FontAwesomeIcon icon={faXmark} />
            </div>

            <input
              type="number"
              className="border sm:text-sm rounded-lg block w-16 p-2.5 bu-input-primary"
              value={numberOfColumns}
              placeholder="cols"
              step={1}
              min={1}
              max={10}
              onChange={(e) => {
                let nCols = e.target.value;
                let nRows = numberOfRows;
                setNumberOfColumns(e.target.value);
                // increase size of data.array
                if (nRows == 0) {
                  setData({
                    array: [{ label: "0", selected: false }],
                  });
                } else {
                  const newArray = [...data.array];
                  newArray.forEach((row, i) => {
                    if (row.length < nCols) {
                      for (let j = row.length; j < nCols; j++) {
                        row.push({
                          label: i * 10 + j,
                          selected: false,
                          key: i * 10 + j,
                        });
                      }
                    } else if (row.length > nCols) {
                      row.pop();
                    }
                  });
                  setData(newArray);
                }
              }}
            />
          </div>
        )}
        {data?.selectedElements?.length === 1 &&
          (props.mode === "edit" || props?.previewOptions?.editLabel.value) && (
            <input
              type="text"
              className="border sm:text-sm rounded-lg block p-2.5 bu-input-primary w-20 text-center"
              value={
                data?.array[
                  getRowCol(data?.selectedElements[0], data?.array).row
                ][getRowCol(data?.selectedElements[0], data?.array).col].label
              }
              placeholder="value"
              onChange={(e) => {
                // column of selectedElement changes when dragged
                // save key in selectedElements
                // change label of selectedElement[0]
                setData((prevState) => {
                  const newArray = [...prevState.array];
                  const pos = getRowCol(data?.selectedElements[0], newArray);
                  newArray[pos.row][pos.col].label = e.target.value;
                  return { array: newArray };
                });
              }}
            />
          )}
        {data?.selectedElements?.length === 2 && (
          <div className="flex flex-row gap-3 items-center">
            {(props.mode === "edit" ||
              canSwap(data.selectedElements[0], data.selectedElements[1])) && (
              <Tooltip
                title={<h1 className="text-lg text-white">Swap</h1>}
                placement="top"
                // TransitionComponent={Zoom}
                arrow
                size="large"
              >
                <button
                  className="bu-button-primary rounded-lg px-7 h-[2.7rem] text-center text-xl font-semibold text-white"
                  onClick={() => {
                    const rowNo = Math.floor(data?.selectedElements[0] / 10);
                    const i1 = data?.array[rowNo].findIndex(
                      (element) => element.key === data.selectedElements[0]
                    );
                    const i2 = data?.array[rowNo].findIndex(
                      (element) => element.key === data.selectedElements[1]
                    );

                    // now swap data.array[rowNo][i1] and data.array[rowNo][i2]
                    const newArray = [...data.array];
                    const temp = newArray[rowNo][i1];
                    newArray[rowNo][i1] = newArray[rowNo][i2];
                    newArray[rowNo][i2] = temp;
                    setData({ array: newArray });

                    // also swap selectedElements
                    // const tempSelectedElements = [...data.selectedElements];
                    // const tempSelected = tempSelectedElements[0];
                    // tempSelectedElements[0] = tempSelectedElements[1];
                    // tempSelectedElements[1] = tempSelected;
                    // setSelectedElements(tempSelectedElements);
                  }}
                >
                  <FontAwesomeIcon icon={faRetweet} />
                </button>
              </Tooltip>
            )}
            {(props.mode === "edit" ||
              canReverse(
                data.selectedElements[0],
                data.selectedElements[1]
              )) && (
              <Tooltip
                title={<h1 className="text-lg text-white">Reverse</h1>}
                placement="top"
                // TransitionComponent={Zoom}
                arrow
                size="large"
              >
                <button
                  className="bu-button-primary rounded-lg px-7 h-[2.7rem] text-center text-lg font-semibold text-white"
                  onClick={() => {
                    const rowNo = Math.floor(data?.selectedElements[0] / 10);
                    const i1 = data?.array[
                      Math.floor(data?.selectedElements[0] / 10)
                    ].findIndex(
                      (element) => element.key === data.selectedElements[0]
                    );
                    const i2 = data?.array[
                      Math.floor(data?.selectedElements[0] / 10)
                    ].findIndex(
                      (element) => element.key === data.selectedElements[1]
                    );

                    const min = Math.min(i1, i2);
                    const max = Math.max(i1, i2);

                    // now reverse data.array[rowNo][min] to data.array[rowNo][max]
                    const newArray = [...data.array];
                    const temp = newArray[rowNo].slice(min, max + 1).reverse();
                    newArray[rowNo].splice(min, max - min + 1, ...temp);
                    setData({ array: newArray });

                    // also swap selectedElements
                    // const tempSelectedElements = [...data.selectedElements];
                    // const tempSelected = tempSelectedElements[0];
                    // tempSelectedElements[0] = tempSelectedElements[1];
                    // tempSelectedElements[1] = tempSelected;
                    // setSelectedElements(tempSelectedElements);
                  }}
                >
                  <FontAwesomeIcon icon={faBackward} />
                </button>
              </Tooltip>
            )}

            {/* <button className="bu-button-primary rounded-lg px-7 h-[2.7rem] text-center text-md font-semibold text-white">
              Sort
            </button> */}
            {(props.mode === "edit" ||
              canSort(data.selectedElements[0], data.selectedElements[1])) && (
              <div className="flex flex-row gap-[.1rem] h-[2.7rem]">
                <Tooltip
                  title={<h1 className="text-lg text-white">Sort Desc</h1>}
                  placement="top"
                  // TransitionComponent={Zoom}
                  arrow
                  size="large"
                >
                  <button
                    className="bu-button-primary px-7 text-center text-2xl font-medium text-white"
                    style={{ borderRadius: "0.5rem 0 0 0.5rem" }}
                    onClick={() => {
                      const rowNo = Math.floor(data?.selectedElements[0] / 10);
                      const i1 = data?.array[
                        Math.floor(data?.selectedElements[0] / 10)
                      ].findIndex(
                        (element) => element.key === data.selectedElements[0]
                      );
                      const i2 = data?.array[
                        Math.floor(data?.selectedElements[0] / 10)
                      ].findIndex(
                        (element) => element.key === data.selectedElements[1]
                      );

                      const min = Math.min(i1, i2);
                      const max = Math.max(i1, i2);

                      // now sort data.array[rowNo][min] to data.array[rowNo][max] in descending order
                      const newArray = [...data.array];
                      const temp = newArray[rowNo]
                        .slice(min, max + 1)
                        .sort((a, b) => b.label - a.label);
                      newArray[rowNo].splice(min, max - min + 1, ...temp);

                      // set selected in newArray[rowNo] false
                      newArray[rowNo].forEach((element) => {
                        element.selected = false;
                      });

                      newArray[rowNo][min].selected = true;
                      newArray[rowNo][max].selected = true;

                      setData({
                        array: newArray,
                        selectedElements: [
                          newArray[rowNo][min].key,
                          newArray[rowNo][max].key,
                        ],
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faCaretDown} />
                  </button>
                </Tooltip>
                <Tooltip
                  title={<h1 className="text-lg text-white">Sort Asc</h1>}
                  placement="top"
                  // TransitionComponent={Zoom}
                  arrow
                  size="large"
                >
                  <button
                    className="bu-button-primary px-7 text-center font-medium text-white text-2xl"
                    style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
                    onClick={() => {
                      const rowNo = Math.floor(data?.selectedElements[0] / 10);
                      const i1 = data?.array[
                        Math.floor(data?.selectedElements[0] / 10)
                      ].findIndex(
                        (element) => element.key === data.selectedElements[0]
                      );
                      const i2 = data?.array[
                        Math.floor(data?.selectedElements[0] / 10)
                      ].findIndex(
                        (element) => element.key === data.selectedElements[1]
                      );

                      const min = Math.min(i1, i2);
                      const max = Math.max(i1, i2);

                      // now sort data.array[rowNo][min] to data.array[rowNo][max] in descending order
                      const newArray = [...data.array];
                      const temp = newArray[rowNo]
                        .slice(min, max + 1)
                        .sort((a, b) => a.label - b.label);
                      newArray[rowNo].splice(min, max - min + 1, ...temp);

                      newArray[rowNo].forEach((element) => {
                        element.selected = false;
                      });

                      newArray[rowNo][min].selected = true;
                      newArray[rowNo][max].selected = true;
                      setData({
                        array: newArray,
                        selectedElements: [
                          newArray[rowNo][min].key,
                          newArray[rowNo][max].key,
                        ],
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faCaretUp} />
                  </button>
                </Tooltip>
              </div>
            )}

            {(props.mode === "edit" ||
              canRotate(
                data.selectedElements[0],
                data.selectedElements[1]
              )) && (
              <div className="flex flex-row gap-[.1rem] h-[2.7rem]">
                <Tooltip
                  title={<h1 className="text-lg text-white">Rotate Left</h1>}
                  placement="top"
                  // TransitionComponent={Zoom}
                  arrow
                  size="large"
                >
                  <button
                    className="bu-button-primary px-7 text-center text-2xl font-medium text-white"
                    style={{ borderRadius: "0.5rem 0 0 0.5rem" }}
                    onClick={() => {
                      console.log("Left");
                      const rowNo = Math.floor(data?.selectedElements[0] / 10);
                      const i1 = data?.array[
                        Math.floor(data?.selectedElements[0] / 10)
                      ].findIndex(
                        (element) => element.key === data.selectedElements[0]
                      );
                      const i2 = data?.array[
                        Math.floor(data?.selectedElements[0] / 10)
                      ].findIndex(
                        (element) => element.key === data.selectedElements[1]
                      );

                      const min = Math.min(i1, i2);
                      const max = Math.max(i1, i2);

                      // now rotate left subarray [data.array[rowNo][min] to data.array[rowNo][max]]

                      // const temp = newArray[rowNo].slice(min, max + 1);
                      // temp.push(temp.shift());
                      // newArray[rowNo].splice(min, temp.length, ...temp);

                      const newArray = [...data.array];
                      const newRow = newArray[rowNo];
                      // console.log(min, max, newArray);
                      newRow[max].selected = false;
                      newRow[min + 1].selected = true;
                      setSelectedElements([
                        newRow[min + 1].key,
                        newRow[min].key,
                      ]);
                      newArray[rowNo] = rotateSubarrayLeft(newRow, min, max, 1);
                      setData({ array: newArray });
                    }}
                  >
                    <FontAwesomeIcon icon={faCaretLeft} />
                  </button>
                </Tooltip>
                <Tooltip
                  title={<h1 className="text-lg text-white">Rotate Right</h1>}
                  placement="top"
                  // TransitionComponent={Zoom}
                  arrow
                  size="large"
                >
                  <button
                    className="bu-button-primary px-7 text-center font-medium text-white text-2xl"
                    style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
                    onClick={() => {
                      console.log("Left");
                      const rowNo = Math.floor(data?.selectedElements[0] / 10);
                      const i1 = data?.array[
                        Math.floor(data?.selectedElements[0] / 10)
                      ].findIndex(
                        (element) => element.key === data.selectedElements[0]
                      );
                      const i2 = data?.array[
                        Math.floor(data?.selectedElements[0] / 10)
                      ].findIndex(
                        (element) => element.key === data.selectedElements[1]
                      );

                      const min = Math.min(i1, i2);
                      const max = Math.max(i1, i2);

                      // now rotate left subarray [data.array[rowNo][min] to data.array[rowNo][max]]

                      // const temp = newArray[rowNo].slice(min, max + 1);
                      // temp.push(temp.shift());
                      // newArray[rowNo].splice(min, temp.length, ...temp);

                      const newArray = [...data.array];
                      const newRow = newArray[rowNo];
                      // console.log(min, max, newArray);
                      newRow[min].selected = false;
                      newRow[max - 1].selected = true;
                      setSelectedElements([
                        newRow[max].key,
                        newRow[max - 1].key,
                      ]);
                      newArray[rowNo] = rotateSubarray(newRow, min, max, 1);
                      setData({ array: newArray });
                    }}
                  >
                    <FontAwesomeIcon icon={faCaretRight} />
                  </button>
                </Tooltip>
              </div>
            )}
          </div>
        )}
      </div>

      {/* <DndProvider backend={HTML5Backend}> */}
      <div
        className="flex flex-col gap-5 p-5 pt-2 justify-center min-h-[24rem]"
        ref={props.stageRef ? props.stageRef : null}
      >
        {data?.array?.map((row, i) => (
          <div className="flex flex-row gap-5 items-center h-full my-auto">
            {row?.map((element, j) => (
              <DraggableElement
                key={element.key}
                id={i * 10 + j}
                row={i}
                col={j}
                element={element}
                onClick={(row, col) => {
                  const newArray = [...data.array];
                  newArray[row][col].selected = !newArray[row][col].selected;
                  setData({ array: newArray });
                  if (newArray[row][col].selected) {
                    // add {row,col} pair to selectedElements
                    console.log([...data.selectedElements, element.key]);
                    setSelectedElements([
                      ...data.selectedElements,
                      element.key,
                    ]);
                  } else {
                    // remove {row,col} pair from selectedElements
                    setSelectedElements(
                      data.selectedElements.filter((e) => e != element.key)
                    );
                  }
                }}
                moveCard={moveCard}
                canDrag={true}
              />
            ))}
          </div>
        ))}
      </div>
      {/* </DndProvider> */}
    </div>
  );
};

export default React.memo(forwardRef(ArrayComponent));
