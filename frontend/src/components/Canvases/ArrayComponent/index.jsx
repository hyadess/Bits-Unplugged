import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Element from "./Element";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

function DraggableElement({ label, id, row, col, moveCard, canDrag }) {
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
      <Element label={label} row={row} col={col} />
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
const ArrayComponent = (props, ref) => {
  const [numberOfRows, setNumberOfRows] = useState(1);
  const [numberOfColumns, setNumberOfColumns] = useState(10);
  const [array, setArray] = useState([]);

  const [data, setData] = [props.input, props.setInput];
  useImperativeHandle(ref, () => {
    return {
      handleReset: (resetData) => handleReset(resetData),
      // getData: () => exportData(),
    };
  });
  const handleReset = (resetData) => {
    if (resetData != null && resetData.array != null) {
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
      // setNumberOfMoves(0);
      // importData(props.input);
      // setLoading(false);
    } else {
      setNumberOfRows(1);
      setNumberOfColumns(10);
      // setArray([
      //   Array.from({ length: 10 }, (_, i) => ({
      //     label: String(i),
      //     selected: false,
      //   })),
      // ]);
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
  }, []);

  useEffect(() => {
    if (data && JSON.stringify(data.array) !== JSON.stringify(array)) {
      // console.log("Data:", data);

      setNumberOfRows(data.array.length);
      setNumberOfColumns(data.array[0]?.length ?? 0);
      // setArray(JSON.parse(JSON.stringify(data.array)));
      // console.log(
      //   "Data changed:",
      //   "Data.array: " + JSON.stringify(data.array),
      //   "array: " + JSON.stringify(array)
      // );
    }
  }, [data]);

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
    // setArray((prevState) => {
    //   const dragCard = prevState[0][dragIndex];
    //   const copiedStateArray = [...prevState[0]];
    //   copiedStateArray.splice(dragIndex, 1);
    //   copiedStateArray.splice(hoverIndex, 0, dragCard);
    //   return [copiedStateArray];
    // });

    // console.log(dragIndex, hoverIndex);
    const dragCard = data.array[dragRow][dragCol];
    const copiedArray = [...data.array];
    const copiedStateArray = [...data.array[dragRow]];
    copiedStateArray.splice(dragCol, 1);
    copiedStateArray.splice(hoverCol, 0, dragCard);
    copiedArray[dragRow] = copiedStateArray;
    setData({ array: copiedArray });
  };
  return (
    <div className="h-[100%] flex flex-col">
      <div className="flex flex-row gap-3 w-60 p-5 h-20 items-center">
        <input
          type="number"
          className="border sm:text-sm rounded-lg block w-full p-2.5 bu-input-primary"
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
        <input
          type="number"
          className="border sm:text-sm rounded-lg block w-full p-2.5 bu-input-primary"
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
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col gap-5 p-5 pt-2 justify-center min-h-[30vh]">
          {data?.array.map((row, i) => (
            <div className="flex flex-row gap-5 items-center h-full ">
              {row?.map((element, j) => (
                <DraggableElement
                  key={element.key}
                  id={i * 10 + j}
                  row={i}
                  col={j}
                  label={element.label}
                  moveCard={moveCard}
                  canDrag={true}
                />
              ))}
            </div>
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default React.memo(forwardRef(ArrayComponent));
