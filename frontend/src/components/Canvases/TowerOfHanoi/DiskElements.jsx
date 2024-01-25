import { Rect } from "react-konva";
import { baseY, diskHeight, pegWidth, sep, colors } from "./config";

const DiskElements = ({
  data,
  handleDiskDragStart,
  handleDiskDragEnd,
  handleDiskHover,
  handleDiskUnhover,
  calculateDiskWidth,
  draggableDisks,
}) =>
  data?.pegs?.flat().map((disk, index) => {
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
        opacity={0.95}
        cornerRadius={[10, 10, 10, 10]}
      />
    );
  });

export default DiskElements;
