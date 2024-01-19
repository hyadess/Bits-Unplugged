import { Group, Rect } from "react-konva";
import { baseY, pegWidth, sep } from "./config";

const PegElements = ({ data, hoveredPeg }) =>
  data?.pegs?.map((peg, index) => {
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

export default PegElements;
