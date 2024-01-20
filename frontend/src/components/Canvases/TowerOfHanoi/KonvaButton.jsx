import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Stage, Layer, Rect, Label, Text, Tag, Line, Group } from "react-konva";

const KonvaButton = ({ x, y, onClick, text }) => {
  return (
    <Label onClick={onClick} x={x} y={y}>
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
        text={text}
        fontSize={18}
        fill="white"
        padding={5}
        fontFamily="Calibri"
      />
    </Label>
  );
};

export default KonvaButton;
