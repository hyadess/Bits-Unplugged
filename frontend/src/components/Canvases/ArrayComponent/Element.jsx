import { Divider } from "@mui/material";
import { useEffect } from "react";

export default function Element({ element, setElement, row, col, isDragging }) {
  useEffect(() => {}, []);
  return (
    <div
      className={`bg-[#dedede] bu-text-primary rounded-lg w-[100%] cursor-pointer flex flex-col relative border-4 transition-colors duration-500 ${
        element.selected
          ? "border-[#ec3965]"
          : "border-[#dedede] hover:border-[#38bf27]"
      }`}
      onClick={() => setElement({ ...element, selected: !element.selected })}
    >
      <div className="flex-center text-3xl font-semibold bu-text-primary p-3">
        {element.label}
      </div>

      <div className="absolute top-0 right-1">{col}</div>
      <div className="absolute bottom-0 left-1">{row}</div>
    </div>
  );
}
