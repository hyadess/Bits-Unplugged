import { Line, Rect } from "react-konva";
import KonvaButton from "./KonvaButton";
import { diskHeight, pegWidth, sep, colors } from "./config";
import React from "react";

const CustomDisk = ({
  data,
  extraDisk,
  setExtraDisk,
  handleDiskDragStart,
  handleDiskDragEnd,
  handleDiskHover,
  handleDiskUnhover,
  calculateDiskWidth,
  visible,
}) => {
  return (
    <React.Fragment>
      <Line
        points={[0, 260, 20 + pegWidth * 3, 260]}
        stroke={"rgb(0,0,0)"}
        strokeWidth={2}
        visible={visible}
      />
      <KonvaButton
        opacity={0}
        text="<"
        x={pegWidth - 20}
        y={270}
        onClick={() =>
          extraDisk > -1 ? setExtraDisk((prev) => prev - 1) : setExtraDisk(9)
        }
        visible={visible}
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
          visible={visible}
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
        visible={visible}
      />
    </React.Fragment>
  );
};

export default CustomDisk;
